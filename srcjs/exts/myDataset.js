import "shiny";
import { saveAs } from "file-saver"

// Shiny.addCustomMessageHandler('myDataset-alert", (msg) => {
//   let response = prompt(msg);
//   Shiny.setInputValue('myDatasetResponse', response);
// })


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
    let name = data["name"]
    let size = data["size"]
    name = validateName(parent, name)

    addRowToCustomDatasetTable(parent, rowId, name, size)
})

Shiny.addCustomMessageHandler("download-handler-myDataset", (data) => {
    // Check if data has the following properties: [filename, extension, content]
    if (data.hasOwnProperty("filename") && data.hasOwnProperty("extension") && data.hasOwnProperty("content")) {
        if (data["extension"] === "csv") {
            // let blob = new Blob(convertToCSV([data["content"]]), {type: "text/csv;charset=utf-8"})
            // Convert the data["content"] to a csv string and save it as a blob.
            console.log(data["content"])
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

function convertToCSV(arr) {
    /**
     * Convert an array of objects to a csv string.
     * @param arr The array of objects.
     * @returns {string}
     */
    let header = Object.keys(arr[0]).join(",") + "\n"

    // Get the values of each object by mapping the object to an array of values. Then join the array with a comma.

    let values = arr.map(function (obj) {
        return Object.values(obj)
    }).map(function (arr) {
        return arr.join(",")
    }).join("\n")

    let csv = header + values
    return csv
}


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
     * @returns {string
     * @type {*|jQuery|HTMLElement}
     */
    let $table = $("#my-dataset-table-" + id)
    name = name.trim()
    let i = 1
    while (row_in_table($table, "name", name, $row)) {
        // If the number already has a number at the end in the form of (1), (2), etc. increment the number.
        if (name.match(/\(\d+\)$/)) {
            name = name.replace(/\(\d+\)$/, "(" + i + ")")
        } else {
            name += " (" + i + ")"
        }
        i++
    }
    return name
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








}

function addRowToCustomDatasetTable(id, rowId, name, size) {
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


    console.log(`Adding row to custom dataset table: ${id}, ${rowId}, ${name}, ${size}`)
    let $table = $("#my-dataset-table-" + id)
    let $tbody = $table.find("tbody")
    let $row = $("<tr id='my-dataset-row-" + rowId + "' class='allign-middle'></tr>")
    $row.data("rowId", rowId)
    $row.data("inputID", id)
    $row.data("name", name)
    $row.data("description", "")
    $row.data("size", size)
    $row.data("date", date)

    // Communicating the date time to the server. The date time is created on client side to avoid timezone issues.
    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " GMT" + (date.getTimezoneOffset() / 60 * -1)
    Shiny.setInputValue($row.data("inputID"), {"action": "set_time", "id": rowId, "time": dateString}, {priority: "event"})

    // Add a bootstrap checkbox to the row.
    $row.append("<td class='align-middle'><input type='checkbox' class='form-check-input my-dataset-table-" + id + "-select-row'></td>")
    $row.append(create_name(name))
    $row.append(create_description(""))
    $row.append(create_size(size))
    $row.append(create_actions(id, rowId))
    $tbody.append($row)
    return $row
}

function download_data_pressed(rowId) {
    console.log("download data pressed")
    // Get the id of the parent element.
    let $row = $("#my-dataset-row-" + rowId)

    // Get the id of
    let id = $row.data("rowId")
    // Get the name of the dataset.

    // Get the parent id
    let inputID = $row.data("inputID")
    console.log(`inputID: ${inputID}`)
    console.log(`id: ${id}`)
    Shiny.setInputValue(inputID, {"action": "download_data", "id": id}, {priority: "event"})

}



function downloadFilter(){
    let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");
}

function download_filter_pressed(rowId) {
    console.log("download filter pressed")
    let $row = $("#my-dataset-row-" + rowId)
    let id = $row.data("rowId")
    let inputID = $row.data("inputID")
    console.log(`inputID: ${inputID}`)
    console.log(`id: ${id}`)

    // downloadFilter()
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
    $downloadDataButton.on("click", function () {
        download_data_pressed(rowId)
    })

    let $downloadFilterButton = $("<li><a class='dropdown-item' href='#'><i class='fas fa-filter'></i> Download filters</a></li>")
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
    // let $download = $("<button class='btn btn-primary btn-sm' id='my-dataset-table-" + id + "-download-" + rowId + "'><i class='fas fa-download'></i></button>")
    // $download.attr("title", "Download")
    // $btnGroup.append($download)



    let $deleteButton = $("<button class='btn btn-danger btn-sm' type='button' data-toggle='tooltip' data-placement='top' title='Delete'></button>")
    $deleteButton.append("<i class='fas fa-trash-alt'></i>")
    $deleteButton.click(function () {
        let $row = $("#my-dataset-row-" + rowId)
        let name = $row.data("name") ? '"' + $row.data("name") +'"' : "this unnamed dataset"

        if (confirm(`Are you sure you want to delete ${name}?`)) {
            let inputID = $("#my-dataset-row-" + rowId).data("inputID")
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
        let newDescription = $description.text()
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

    // If name is empty, set it to "Untitled".
    if ($name.text().trim().length === 0) {
        $name.text("untitled...")
        // Get the row and set the name to "untitled".
        $name.css("font-style", "italic")
    }

    $name.click(function () {
      $name.attr("contenteditable", "true")
      $name.focus()
        $name.css("font-style", "normal")
    })

    $name.keypress(function (e) {
      if (e.which == 13) {
          $name.attr("contenteditable", false)
          $name.blur()
      }
    })

    $name.blur(function () {
    $name.attr("contenteditable", "false")
    let $row = $name.closest("tr")
    let newTitle = $name.text()
    newTitle = newTitle.trim()
    if (newTitle.length === 0) {
        newTitle = validateName($row.data("inputID"), "untitled", $row)
        $name.text(newTitle)
        $name.css("font-style", "italic")
        $row.data("name", "")
      // $name.text($row.data("name"))

    } else {
      newTitle = validateName($row.data("inputID"), newTitle, $row)
      $row.data("name", newTitle)
      $name.text(newTitle)
      $name.css("font-style", "normal")
      let inputID = $row.data("inputID")
      let rowId = $row.data("rowId")
      Shiny.setInputValue(inputID, {"action": "name_change", "id": rowId, "name": newTitle}, {priority: "event"})
    }
    })
}
