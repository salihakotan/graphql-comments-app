import path from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';

import { mergeTypeDefs } from '@graphql-tools/merge';

import fs from "fs"


 
const typesArray = loadFilesSync(path.join(__dirname), { extensions: ['graphql'] })
 
export default mergeTypeDefs(typesArray)