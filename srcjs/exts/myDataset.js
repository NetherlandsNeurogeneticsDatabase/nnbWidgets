import "shiny";
import { saveAs } from "file-saver";
import swal from 'sweetalert'
import xss from "xss";

Shiny.addCustomMessageHandler("build-myDataset", (data) => {  
  let parent = data["id"]
  let max_rows = data["maxRows"]
    if ($("#" + parent).length > 0) {
        buildCustomDatasetTable(parent, max_rows);
    }
})


Shiny.addCustomMessageHandler("add-row-myDataset", (data) => {
    let parent = data["id"]
    let rowId = data["row_id"]
    let name = xss(data["name"])
    let size = data["size"]
    let description = xss(data["description"])

    name = validateName(parent, name)
    if (name !== false){
        addRowToCustomDatasetTable(parent, rowId, name, description, size)
    }
})

Shiny.addCustomMessageHandler("download-handler-myDataset", (data) => {
    /**
     * A handler that downloads the data. This is called when the user clicks the download button.
     * The data is sent to the server and the server sends it back to the client.
     * @param data The data to download.
     * @param extension The extension of the file.
     * @param filename The name of the file.
     */
    // Check if data has the following properties: [filename, extension, content]
    if (data.hasOwnProperty("filename") && data.hasOwnProperty("extension") && data.hasOwnProperty("content")) {
        if (data["extension"] === "csv") {
            let blob = new Blob([data["content"]], {type: "text/csv;charset=utf-8"})
            saveAs(blob, data["filename"] + "." + data["extension"])

        } else if(data["extension"] === "json"){
            let blob = new Blob([JSON.stringify(data["content"], null, 2)], {type: "text/plain;charset=utf-8"});
            saveAs(blob, data["filename"] + "." + data["extension"]);
        } else {
            console.log("Extension not supported.")
        }

    } else {
        console.log("Error: Data does not have the correct properties.")
    }
})


Shiny.addCustomMessageHandler("toggle-download-button", (data) => {
    let parentID = data["parentID"]
    let datasetID = data["datasetID"]
    let action = data["action"]

    // If action is not show or hide, do nothing.
    if (action !== "show" && action !== "hide") {
        console.log("Error: Action must be either show or hide.")
        return
    }

    // Get the download button which is inside the $row with id "download-data-" + datasetID
    let $downloadButton = $("#" + parentID).find("#download-data-" + datasetID)


    // If the action is "show", show the button. Otherwise, 'hide' the button.

    if (action === "show") {
        $downloadButton.data("blocked", false)
        $downloadButton.css("text-decoration", "none")
    } else {
        $downloadButton.data("blocked", true)
        $downloadButton.css("text-decoration", "line-through")
    }
})


Shiny.addCustomMessageHandler("set-cookie", (data) => {
    /**
     * Add a cookie.
     * @param name The name of the cookie.
     * @param msg The message of the cookie.
     */

    let name = data["name"]
    let msg = data["msg"]

    console.log("Setting cookie")
    console.log(msg)
    // if (Cookies.get(name) !== undefined) {
    //     Cookies.remove(name)
    // }

    // Add the cookie.
    localStorage.setItem(name, JSON.stringify(msg))
})



function row_in_table(table, checkParam, paramValue, $ownRow) {
    /**
     * Check if a row exists in a table.
     * @param table The table.
     * @param checkParam The parameter to check.
     * @returns {boolean}
     */

    let isDuplicate = false

    // Get the rows excluding the own row.
    let $rows;
    if ($ownRow) {
        $rows = table.find("tbody tr").not($ownRow)
    } else {
        $rows = table.find("tbody tr")
    }

    // Check if the row has a data(checkParam) that matches paramValue.
    $rows.filter(function () {
        if ($(this).data(checkParam) === paramValue) {
            isDuplicate = true
        }
    })
    return isDuplicate
}

function validateName(id, name, $row) {
    /**
     * Validate the name of the dataset. If the name already exists, append a number to the end.
     * @param id The id of the parent element.
     * @param name The name of the dataset.
     * @returns {string} The validated name.
     * @type {*|jQuery|HTMLElement}
     */
    let $table = $("#my-dataset-table-" + id)
    name = name.trim()
    if (row_in_table($table, "name", name, $row)) {
        swal({
            title: "Name already exists?",
            text: "Please change the name of the dataset to a name that does not exist.",
            icon: "warning",
        })
    } else {
        return name
    }
}

function selectAllCheckbox(id){
    /**
     * Create a checkbox for selecting all rows.
     * @type {*|jQuery|HTMLElement}
     */

    let $checkbox = $("<input class='form-check-input' type='checkbox' id='my-dataset-table-" + id + "-select-all'>")

    // If the checkbox is checked, check all the other checkboxes.
    $checkbox.change(function () {
        let $table = $("#my-dataset-table-" + id)
        let $tbody = $table.find("tbody")
        let $rows = $tbody.find("tr")
        $rows.each(function () {
            $(this).find("input[type='checkbox']").prop("checked", $checkbox.prop("checked"))
        })
    })

    return $checkbox
}

function buildCustomDatasetTable(id, max_rows=10) {
    /**
    * Create a table that has 4 columns: name, description, size and buttons.
    * @type {*|jQuery|HTMLElement}
    * @param id The id of the parent element.
    * @returns {jQuery|HTMLElement} The table.
    */
    let $table = $("<table class='table table-striped' id='my-dataset-table-" + id + "'></table>")
    $table.data("maxRows", max_rows)


    let headers = ["Name", "Description", "Size", "Actions"]
    // Add the headers to the table.
    $table.append("<thead><tr></tr></thead>")

    // create a checkbox for selecting all rows
    let $th = $("<th class='align-middle' ></th>")

    $th.append(selectAllCheckbox(id))
    $table.find("thead tr").append($th)



    headers.forEach(function (header) {
      $table.find("thead tr").append("<th scope='col'>" + header + "</th>")
    })
    // Add the body to the table.
    $table.append("<tbody></tbody>")
    $("#" + id).append($table)
    let cookieRows = getRowCookie()
    if (cookieRows !== undefined) {
        Shiny.setInputValue(id + "_cookies", cookieRows, {priority: "event"})
    }
}


function getRowCookie(){
    /**
     * Get the rows from the cookie.
     * @returns {Array} The rows.
     */
    let myDataset = localStorage.getItem("myDataset")
    if (myDataset !== undefined) {
        return JSON.parse(myDataset)
    }
}

function addRowToCustomDatasetTable(id, rowId, name, description, size) {
    /**
    * Add a row to the custom dataset table.
    * @param id The id of the parent element.
    * @param name The name of the dataset.
    * @param description The description of the dataset.
    * @param size The size of the dataset.
    * @returns {jQuery|HTMLElement}
    */

    // Get the current date
    let date = new Date()
    let $table = $("#my-dataset-table-" + id)
    let $tbody = $table.find("tbody")
    let $row = $("<tr id='my-dataset-row-" + rowId + "' class='allign-middle'></tr>")
    $row.data("rowId", rowId)
    $row.data("inputID", id)
    $row.data("name", name)
    $row.data("description", description)
    $row.data("size", size)
    $row.data("date", date)

    // Communicating the date time to the server. The date time is created on client side to avoid timezone issues.
    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " GMT" + (date.getTimezoneOffset() / 60 * -1)
    Shiny.setInputValue($row.data("inputID"), {"action": "set_time", "id": rowId, "time": dateString}, {priority: "event"})

    // Add a bootstrap checkbox to the row.
    $row.append("<td class='align-middle'><input type='checkbox' class='form-check-input my-dataset-table-" + id + "-select-row'></td>")
    $row.append(create_name(name))
    $row.append(create_description(description))
    $row.append(create_size(size))
    $row.append(create_actions(id, rowId))
    $tbody.append($row)
    return $row
}

function download_data_pressed(rowId) {
    // Get the id of the parent element.
    let $row = $("#my-dataset-row-" + rowId)

    // Get the id of
    let id = $row.data("rowId")
    // Get the name of the dataset.

    // Get the parent id
    let inputID = $row.data("inputID")

    Shiny.setInputValue(inputID, {"action": "download_data", "id": id}, {priority: "event"})

}

function download_filter_pressed(rowId) {
    let $row = $("#my-dataset-row-" + rowId)
    let id = $row.data("rowId")
    let inputID = $row.data("inputID")

    Shiny.setInputValue(inputID, {"action": "download_filter", "id": id}, {priority: "event"})
}

function createDownloadDropdown(id, rowId) {
    /**
     * Create a dropdown menu that has two options: download data and download filter.
     * @param id The id of the row
     * @returns {jQuery|HTMLElement} The dropdown menu.
     */
    let dropdownID = "download-dropdown-" + id
    let $dropdown = $("<div class='dropdown'></div>")
    let $dropdownButton = $("<button class='btn btn-outline-primary btn-sm dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-download'></i></button>")
    $dropdownButton.attr("id", dropdownID)

    let $dropdownMenu = $("<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton'></ul>")
    $dropdownMenu.attr("aria-labelledby", dropdownID)

    let $downloadDataButton = $("<li><a class='dropdown-item' href='#'><i class='fas fa-file-arrow-down'></i> Download data</a></li>")
    $downloadDataButton.attr("id", "download-data-" + rowId)
    $downloadDataButton.data("blocked", false)

    $downloadDataButton.on("click", function () {
        if ($downloadDataButton.data("blocked") === false) {
            download_data_pressed(rowId)
        } else {
            alert(
                `This dataset is currently being processed for download. Please wait until the download is complete.\n\n` +
                "(The download can take a while if the dataset is large, and clinical history data is included.)"
            )
        }
    })

    let $downloadFilterButton = $("<li><a class='dropdown-item' href='#'><i class='fas fa-filter'></i> Download filters</a></li>")
    $downloadFilterButton.attr("id", "download-filter-" + rowId)
    $downloadFilterButton.on("click", function () {
        download_filter_pressed(rowId)
    })

    $dropdownMenu.append($downloadDataButton)
    $dropdownMenu.append($downloadFilterButton)

    $dropdown.append($dropdownButton)
    $dropdown.append($dropdownMenu)

    return $dropdown
}

function create_actions(id, rowId){
    /**
     * Create the actions column.
     * @param id The id of the parent element.
     * @param rowId The id of the row.
     */
    let $actions = $("<td class='align-middle'></td>")

    // Create a button group for the actions.
    let $btnGroup = $("<div class='btn-group' role='group'></div>")
    $actions.append($btnGroup)

    $btnGroup.append(createDownloadDropdown(id, rowId))


    // Create the download button, set a tooltip and add it to the actions column.

    let $deleteButton = $("<button class='btn btn-danger btn-sm' type='button' data-toggle='tooltip' data-placement='top' title='Delete'></button>")
    $deleteButton.append("<i class='fas fa-trash-alt'></i>")
    $deleteButton.click(function () {
        let $row = $("#my-dataset-row-" + rowId)
        let name = $row.data("name") ? '"' + $row.data("name") +'"' : "this unnamed dataset"

        if (confirm(`Are you sure you want to delete ${name}?`)) {
            let inputID = $row.data("inputID")
            Shiny.setInputValue(inputID, {"action": "delete", "id": rowId}, {priority: "event"})
            deleteRow(id, rowId)
        }
    })
    $btnGroup.append($deleteButton)




    return $actions
}

function create_size(size){
    /**
     * Handles the creation of the size.
     * @type {*|jQuery|HTMLElement}
     */
    let $td = $("<td class='align-middle'></td>")

    let sizeText = size + " donor"
    if (size > 1) {
        sizeText += "s"
    }


    let $size = $("<p>" + sizeText + "</p>")

    $td.append($size)
    return $td
}
function create_name(name) {
  /**
   * Handles the creation of the title.
   * @type {*|jQuery|HTMLElement}
   */
  let $td = $("<td class='align-middle'></td>")
  let $name = $("<b>" + name + "</b>")
  make_name_editable($name)
  $td.append($name)
  return $td
}

function create_description(description="") {
    /**
     * Handles the creation of the description.
     * @type {*|jQuery|HTMLElement}
     */

    let $td = $("<td class='align-middle'></td>")

    // Set font style to italic if there is no description.
    if (description === "") {
        $td.css("font-style", "italic")
        description = "No description..."
    }

    let $description = $("<p>" + description + "</p>")
    make_description_editable($description)
    $td.append($description)
    return $td
}

function deleteRow(id, rowId) {
    /**
     * Delete a row from the table.
     * @param id The id of the parent element.
     * @param rowId The id of the row.
     */
    let $table = $("#my-dataset-table-" + id)
    let $tbody = $table.find("tbody")
    let $row = $tbody.find("#my-dataset-row-" + rowId)
    $row.remove()
}

function make_description_editable($description) {
    /**
     * Make the description editable. When the user clicks on the description, it will become editable.
     * @param $description The description.
     * @returns NULL
     */

    $description.click(function () {
        // Remove the italic style.
        $description.css("font-style", "normal")
        $description.attr("contenteditable", "true")
        $description.focus()

    })


    $description.keypress(function (e) {
        if (e.which === 13) {
            $description.attr("contenteditable", false)
            $description.blur()
        }
    })

    $description.blur(function () {
        // Update function
        $description.attr("contenteditable", "false")
        let $row = $description.closest("tr")
        let newDescription = xss($description.text())
        newDescription = newDescription.trim()

        if (newDescription.length === 0) {
            // Set the font style to italic.
            $description.css("font-style", "italic")
            $description.text("No description...")
            $row.data("description", "")
        }
        let inputID = $row.data("inputID")
        let rowId = $row.data("rowId")
        Shiny.setInputValue(inputID, {"action": "description_change", "id": rowId, "description": newDescription}, {priority: "event"})
        $row.data("description", newDescription)

    })
}

function make_name_editable($name) {
    /**
    * Make the title editable. When the user clicks on the title, it will become editable.
    * @param $title The title.
    * @returns NULL
    */

    $name.click(function () {
      $name.attr("contenteditable", "true")
      $name.focus()
        $name.css("font-style", "normal")
    })

    $name.keypress(function (e) {
      if (e.which === 13) {
          $name.attr("contenteditable", false)
          $name.blur()
      }
    })

    $name.blur(function () {
    $name.attr("contenteditable", "false")
    let $row = $name.closest("tr")
    let newTitle = xss($name.text())
    let inputID = $row.data("inputID")
    let rowId = $row.data("rowId")
    newTitle = newTitle.trim()
    if (newTitle.length === 0) {
        $name.text($row.data("name"))
        swal({
            title: "Error",
            text: "The name cannot be empty.",
            icon: "error",
        })
    } else if (newTitle.length > 50) {
        $name.text($row.data("name"))
        swal({
            title: "Error",
            text: "The name cannot be longer than 50 characters.",
            icon: "error",
        })
    } else {
        if (validateName($row.data("inputID"), newTitle, $row)) {
            $row.data("name", newTitle)
            $name.text(newTitle)
            $name.css("font-style", "normal")
            Shiny.setInputValue(inputID, {"action": "name_change", "id": rowId, "name": newTitle}, {priority: "event"})
        } else {
            // Name is not valid so we set it back to the old name.
            $name.text($row.data("name"))
        }
    }
    })
}
