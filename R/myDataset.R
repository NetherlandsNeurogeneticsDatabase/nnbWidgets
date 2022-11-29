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

#' Show an alert
#' 
#' Show a vanilla JavaScript alert.
#' 
#' @param msg Message to display.
#' @param session A valid shiny `session`.
#'  
#' @examples 
#' library(shiny)
#' 
#' ui <- fluidPage(
#'   use_name(),
#'   verbatimTextOutput("response")
#' )
#' 
#' server <- function(input, output){
#' myDataset("Please enter something:")
#'  output$response <- renderPrint({
#'    input$myDatasetResponse
#'  })
#' }
#' 
#' if(interactive())
#'  shinyApp(ui, server)
#' 
#' @export
myDataset <- function(id, session = shiny::getDefaultReactiveDomain()){
  session$sendCustomMessage("build-myDataset", list(id = id, maxRows = 10))
}

#' @export
myDatasetAddRow <- function(id, row_id, name, size, session = shiny::getDefaultReactiveDomain()){
  session$sendCustomMessage("add-row-myDataset", list(id = id, row_id = row_id, name = name, size = size))
}

#' @export
myDatasetDownloadHandler <- function(filename, extension, content, session = shiny::getDefaultReactiveDomain()){
    data <- list(filename = filename, extension = extension, content = content)
    session$sendCustomMessage("download-handler-myDataset", data)
}

