.onLoad <- function(libname, pkgname){
  path <- system.file("packer", package = "nnbWidgets")
  shiny::addResourcePath('nnbWidgets-assets', path)
}
