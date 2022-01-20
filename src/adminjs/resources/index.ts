import { ResourceWithOptions } from "adminjs";
import { Genre, Title } from "../../models";
import { genreResourceOptions } from "./genre";
import { titleResourceOptions } from "./title";

const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Genre,
    options: genreResourceOptions
  },
  {
    resource: Title,
    options: titleResourceOptions
  },
]

export { adminJsResources }