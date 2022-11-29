#' Dependencies
#' 
#' Include dependencies, place anywhere in the shiny UI.
#' 
#' @importFrom shiny singleton tags
#' 
#' @export
usemyDataset <- function(){
  singleton(
    tags$head(
      tags$script(src = "nnbWidgets-assets/myDataset.js")
    )
  )
}

#' Construct a myDataset widget
#'
#' @param id The id of the widget
#' @param session A valid shiny `session`.
#'
#' @export
myDataset <- function(id, session = shiny::getDefaultReactiveDomain()){
  session$sendCustomMessage("build-myDataset", list(id = id, maxRows = 10))
}

#' Add a row to the myDataset widget
#'
#' @param id The id of the widget
#' @param session A valid shiny `session`.
#' @param row_id The id of the datasetID
#' @param name The name of the dataset
#' @param size The size of the dataset
#'
#' @export
myDatasetAddRow <- function(id, row_id, name, size, session = shiny::getDefaultReactiveDomain()){
  session$sendCustomMessage("add-row-myDataset", list(id = id, row_id = row_id, name = name, size = size))
}

#' Download a dataset from the myDataset widget
#'
#' @param filename The output filename
#' @param extension The output file extension ("csv" or "json")
#' @param content The content of the file. This can be a string or a list.
#' @param session A valid shiny `session`.

#' @export
myDatasetDownloadHandler <- function(filename, extension, content, session = shiny::getDefaultReactiveDomain()){
    data <- list(filename = filename, extension = extension, content = content)
    session$sendCustomMessage("download-handler-myDataset", data)
}

#' Blocks the download button until the download is complete
#'
#' @param parentID The id of the myDataset widget
#' @param datasetID The id of the dataset
#' @param action Can be 'hide' or 'show'. This will block or unblock the download button
#' @export
myDatasetToggleDownload <- function(parentID, datasetID, action="hide", session = shiny::getDefaultReactiveDomain()){
  session$sendCustomMessage("toggle-download-button", list(parentID = parentID, datasetID = datasetID, action = action))
}