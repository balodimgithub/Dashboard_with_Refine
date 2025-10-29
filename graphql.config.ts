 import type {IGraphQLConfig} from "graphql-config";

const config : IGraphQLConfig = { 
 //define graphql schema provided by refine.
    schema : "https://api.crm.refine.dev/graphql",
    extensions : {
//config is a plugin that generates typescript types from the  GraphQL schema
//https://the-guild.dev/graphql/codegen
codegen : {
    //hooks are commands that are executed after a certain event
    hooks : {
     afterOneFileWrite : ["eslint --fix", "prettier --write"]
    },
    generates : {
        "src/graphql/schema.types.ts" : {
            plugins : ["typescript"],
            //set the config of the typescript plugin
            //this defines how the generated types will look like
            config :{
                skipTypename : true,//skipTypename is used to remove
                //_typename from the generated types
                enumAsTypes : true, 
                //enum as types is used to generate
                //enum as types instead of enums
                //scalars is used to define how the scalars i.e DateTime, JSON etc
                // will be generated
                //scalar is a type that is not a list and does not have fields.
                // Meaning it is a primitive type.
                scalars : {
                    //DateTime is a scalar type that is  used to represent date and time
                    DateTime : {
                        input : "string",
                        output : "string",
                        format : "date-time",

                    }
                }
            }
        },
//generates typescripts types from GraphQL operations
//graphql operation are queries, mutations and subscriptions
//we write in our code to communicate with the GraphQL API

        "src/graphql/types.ts" : {
    //preset is a plugin that is used to generate typescript types
    // from GraphQL operations
    //import-types suggests to import types from schema.types.ts or 
    //other files
    //this is used to avoid duplication of types
    //https://the-guild.dev/graphql/codegen/plugins/presets
    //import-types-presets
    presets : "import-types",
    //document is used to define the path of the files 
    // that contains GraphQL operations
    documents:["src/**/*.{ts,tsx}"],
    //plugins is used to define plugins that will be used
    // to generate typescript types from the GraphQL operations.
    plugins :["typescript-operations"],
    config :{
        skipTypename : true,
        enumAsTypes : true,
        //determine whether the generated types should be resolved
        //ahead of time or not.,
        //when preReSolveTypes is set to false, the code generator
        //will not  try to resolve the types  ahead of time.
        //Instead, it will generate more generic types, and the 
        //actual types will be resolved at then runtime.
        preResolveTypes : true,
        //useTypeImport is used to import types using import type 
        //instead of import.
        useTypeImport : true
    },
    //presetConfig is used to define the config of the presets
   presetConfig :{
    typesPath : "./schema.types"
}
        }
    }
}
}
 }
 export default config;