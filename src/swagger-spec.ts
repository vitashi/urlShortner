const swaggerSpec = {
    "swagger": "2.0",
    "info": {
        "description": "API documentation for the url shortening service",
        "version": "1.0.0",
        "title": "URL shortening service",
        "contact": {
            "email": "vshisoka@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "schemes": ["http"],
    "host": "localhost:8080",
    "basePath": "/",
    "paths" : {
        "/encode" : {
            "post" : {
                "summary" : "Encode a url",
                "description": "Encode a url",
                "produces": ["application/json"],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "task object",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "properties": {
                                "rawURL" : {
                                    "type": "string",
                                } 
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Request has been successfully encoded",
                        "schema": {
                            "items": {
                                "$ref": "#/definitions/EncodingSuccessResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Invalid status value",
                        "schema": {
                            "$ref": "#/definitions/InvalidEncodeResponse"
                        }
                    },
                    "409": {
                        "description": "This URL has already been encoded and stored",
                        "schema": {
                            "$ref": "#/definitions/InvalidEncodeResponse"
                        }
                    }
                }
            }
        },
        "/decode/{encodedURL}" : {
            "get" : {
                "summary" : "Decode a shortURL to the original URL",
                "description": "Decode a shortURL to the original URL",
                "produces": ["application/json"],
                "consumes": ["application/json"],
                "parameters": [
                    {
                        "name": "encodedURL",
                        "in": "path",
                        "description": "ShortURL that needs decoding",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/DecodingSuccessResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "A malformed request.",
                        "schema": {
                            "$ref": "#/definitions/InvalidDecodeResponse"
                        }
                    },
                    "404": {
                        "description": "The encodedURL passed in has no url associated with it",
                        "schema": {
                            "$ref": "#/definitions/InvalidDecodeResponse"
                        }
                    }
                }
            }
        },
    }, 
    "definitions": {
        "InvalidEncodeResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                },
                "rawURL": {
                    "type": "string"
                },
            }
        },
        "EncodingSuccessResponse": {
            "type": "object",
            "properties": {
                "encodedURL": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "rawURL": {
                    "type": "string"
                },
            }
        },
        "DecodingSuccessResponse": {
            "type": "object",
            "properties": {
                "encodedURL": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
            }
        },
        "InvalidDecodeResponse": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                },
                "encodedURL": {
                    "type": "string"
                },
            }
        },
    }
}

export default swaggerSpec