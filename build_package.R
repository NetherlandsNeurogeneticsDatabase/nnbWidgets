
# Get the scope argument from command line
args <- commandArgs(trailingOnly = TRUE)
scope <- args[1]
# Scope can only be the value "dev" or "prod"
if (scope != "dev" && scope != "prod"){
  stop("Scope can only be the value 'dev' or 'prod'")
}


paste("Building package with scope: ", scope)
devtools::document()
if (scope == "dev"){
  packer::bundle_dev()
} else if (scope == "prod"){
  packer::bundle_prod()
}
devtools::install()