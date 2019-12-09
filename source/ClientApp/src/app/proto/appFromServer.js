/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.app_from_server || ($protobuf.roots.app_from_server = {});

export const Jde = $root.Jde = (() => {

    /**
     * Namespace Jde.
     * @exports Jde
     * @namespace
     */
    const Jde = {};

    Jde.ApplicationServer = (function() {

        /**
         * Namespace ApplicationServer.
         * @memberof Jde
         * @namespace
         */
        const ApplicationServer = {};

        ApplicationServer.Web = (function() {

            /**
             * Namespace Web.
             * @memberof Jde.ApplicationServer
             * @namespace
             */
            const Web = {};

            Web.FromServer = (function() {

                /**
                 * Namespace FromServer.
                 * @memberof Jde.ApplicationServer.Web
                 * @namespace
                 */
                const FromServer = {};

                FromServer.Acknowledgement = (function() {

                    /**
                     * Properties of an Acknowledgement.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IAcknowledgement
                     * @property {number|null} [Id] Acknowledgement Id
                     */

                    /**
                     * Constructs a new Acknowledgement.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an Acknowledgement.
                     * @implements IAcknowledgement
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IAcknowledgement=} [properties] Properties to set
                     */
                    function Acknowledgement(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Acknowledgement Id.
                     * @member {number} Id
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @instance
                     */
                    Acknowledgement.prototype.Id = 0;

                    /**
                     * Creates a new Acknowledgement instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IAcknowledgement=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Acknowledgement} Acknowledgement instance
                     */
                    Acknowledgement.create = function create(properties) {
                        return new Acknowledgement(properties);
                    };

                    /**
                     * Encodes the specified Acknowledgement message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Acknowledgement.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IAcknowledgement} message Acknowledgement message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Acknowledgement.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Id);
                        return writer;
                    };

                    /**
                     * Encodes the specified Acknowledgement message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Acknowledgement.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IAcknowledgement} message Acknowledgement message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Acknowledgement.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Acknowledgement message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Acknowledgement} Acknowledgement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Acknowledgement.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Id = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Acknowledgement message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Acknowledgement} Acknowledgement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Acknowledgement.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Acknowledgement message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Acknowledgement.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            if (!$util.isInteger(message.Id))
                                return "Id: integer expected";
                        return null;
                    };

                    /**
                     * Creates an Acknowledgement message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Acknowledgement} Acknowledgement
                     */
                    Acknowledgement.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement();
                        if (object.Id != null)
                            message.Id = object.Id >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from an Acknowledgement message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Acknowledgement} message Acknowledgement
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Acknowledgement.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults)
                            object.Id = 0;
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            object.Id = message.Id;
                        return object;
                    };

                    /**
                     * Converts this Acknowledgement to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Acknowledgement
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Acknowledgement.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Acknowledgement;
                })();

                /**
                 * ELogLevel enum.
                 * @name Jde.ApplicationServer.Web.FromServer.ELogLevel
                 * @enum {string}
                 * @property {number} Trace=0 Trace value
                 * @property {number} Debug=1 Debug value
                 * @property {number} Information=2 Information value
                 * @property {number} Warning=3 Warning value
                 * @property {number} Error=4 Error value
                 * @property {number} Critical=5 Critical value
                 * @property {number} None=6 None value
                 */
                FromServer.ELogLevel = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "Trace"] = 0;
                    values[valuesById[1] = "Debug"] = 1;
                    values[valuesById[2] = "Information"] = 2;
                    values[valuesById[3] = "Warning"] = 3;
                    values[valuesById[4] = "Error"] = 4;
                    values[valuesById[5] = "Critical"] = 5;
                    values[valuesById[6] = "None"] = 6;
                    return values;
                })();

                FromServer.Application = (function() {

                    /**
                     * Properties of an Application.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IApplication
                     * @property {number|null} [Id] Application Id
                     * @property {string|null} [Name] Application Name
                     * @property {Jde.ApplicationServer.Web.FromServer.ELogLevel|null} [DbLevel] Application DbLevel
                     * @property {Jde.ApplicationServer.Web.FromServer.ELogLevel|null} [FileLevel] Application FileLevel
                     */

                    /**
                     * Constructs a new Application.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an Application.
                     * @implements IApplication
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplication=} [properties] Properties to set
                     */
                    function Application(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Application Id.
                     * @member {number} Id
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @instance
                     */
                    Application.prototype.Id = 0;

                    /**
                     * Application Name.
                     * @member {string} Name
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @instance
                     */
                    Application.prototype.Name = "";

                    /**
                     * Application DbLevel.
                     * @member {Jde.ApplicationServer.Web.FromServer.ELogLevel} DbLevel
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @instance
                     */
                    Application.prototype.DbLevel = 0;

                    /**
                     * Application FileLevel.
                     * @member {Jde.ApplicationServer.Web.FromServer.ELogLevel} FileLevel
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @instance
                     */
                    Application.prototype.FileLevel = 0;

                    /**
                     * Creates a new Application instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplication=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Application} Application instance
                     */
                    Application.create = function create(properties) {
                        return new Application(properties);
                    };

                    /**
                     * Encodes the specified Application message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Application.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplication} message Application message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Application.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Id);
                        if (message.Name != null && message.hasOwnProperty("Name"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Name);
                        if (message.DbLevel != null && message.hasOwnProperty("DbLevel"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.DbLevel);
                        if (message.FileLevel != null && message.hasOwnProperty("FileLevel"))
                            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.FileLevel);
                        return writer;
                    };

                    /**
                     * Encodes the specified Application message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Application.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplication} message Application message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Application.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Application message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Application} Application
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Application.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Application();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Id = reader.uint32();
                                break;
                            case 2:
                                message.Name = reader.string();
                                break;
                            case 3:
                                message.DbLevel = reader.int32();
                                break;
                            case 4:
                                message.FileLevel = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Application message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Application} Application
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Application.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Application message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Application.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            if (!$util.isInteger(message.Id))
                                return "Id: integer expected";
                        if (message.Name != null && message.hasOwnProperty("Name"))
                            if (!$util.isString(message.Name))
                                return "Name: string expected";
                        if (message.DbLevel != null && message.hasOwnProperty("DbLevel"))
                            switch (message.DbLevel) {
                            default:
                                return "DbLevel: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        if (message.FileLevel != null && message.hasOwnProperty("FileLevel"))
                            switch (message.FileLevel) {
                            default:
                                return "FileLevel: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        return null;
                    };

                    /**
                     * Creates an Application message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Application} Application
                     */
                    Application.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Application)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Application();
                        if (object.Id != null)
                            message.Id = object.Id >>> 0;
                        if (object.Name != null)
                            message.Name = String(object.Name);
                        switch (object.DbLevel) {
                        case "Trace":
                        case 0:
                            message.DbLevel = 0;
                            break;
                        case "Debug":
                        case 1:
                            message.DbLevel = 1;
                            break;
                        case "Information":
                        case 2:
                            message.DbLevel = 2;
                            break;
                        case "Warning":
                        case 3:
                            message.DbLevel = 3;
                            break;
                        case "Error":
                        case 4:
                            message.DbLevel = 4;
                            break;
                        case "Critical":
                        case 5:
                            message.DbLevel = 5;
                            break;
                        case "None":
                        case 6:
                            message.DbLevel = 6;
                            break;
                        }
                        switch (object.FileLevel) {
                        case "Trace":
                        case 0:
                            message.FileLevel = 0;
                            break;
                        case "Debug":
                        case 1:
                            message.FileLevel = 1;
                            break;
                        case "Information":
                        case 2:
                            message.FileLevel = 2;
                            break;
                        case "Warning":
                        case 3:
                            message.FileLevel = 3;
                            break;
                        case "Error":
                        case 4:
                            message.FileLevel = 4;
                            break;
                        case "Critical":
                        case 5:
                            message.FileLevel = 5;
                            break;
                        case "None":
                        case 6:
                            message.FileLevel = 6;
                            break;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an Application message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Application} message Application
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Application.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Id = 0;
                            object.Name = "";
                            object.DbLevel = options.enums === String ? "Trace" : 0;
                            object.FileLevel = options.enums === String ? "Trace" : 0;
                        }
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            object.Id = message.Id;
                        if (message.Name != null && message.hasOwnProperty("Name"))
                            object.Name = message.Name;
                        if (message.DbLevel != null && message.hasOwnProperty("DbLevel"))
                            object.DbLevel = options.enums === String ? $root.Jde.ApplicationServer.Web.FromServer.ELogLevel[message.DbLevel] : message.DbLevel;
                        if (message.FileLevel != null && message.hasOwnProperty("FileLevel"))
                            object.FileLevel = options.enums === String ? $root.Jde.ApplicationServer.Web.FromServer.ELogLevel[message.FileLevel] : message.FileLevel;
                        return object;
                    };

                    /**
                     * Converts this Application to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Application
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Application.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Application;
                })();

                FromServer.Applications = (function() {

                    /**
                     * Properties of an Applications.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IApplications
                     * @property {Array.<Jde.ApplicationServer.Web.FromServer.IApplication>|null} [Values] Applications Values
                     */

                    /**
                     * Constructs a new Applications.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an Applications.
                     * @implements IApplications
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplications=} [properties] Properties to set
                     */
                    function Applications(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Applications Values.
                     * @member {Array.<Jde.ApplicationServer.Web.FromServer.IApplication>} Values
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @instance
                     */
                    Applications.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new Applications instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplications=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Applications} Applications instance
                     */
                    Applications.create = function create(properties) {
                        return new Applications(properties);
                    };

                    /**
                     * Encodes the specified Applications message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Applications.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplications} message Applications message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Applications.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromServer.Application.encode(message.Values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Applications message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Applications.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplications} message Applications message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Applications.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an Applications message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Applications} Applications
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Applications.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Applications();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.ApplicationServer.Web.FromServer.Application.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an Applications message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Applications} Applications
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Applications.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an Applications message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Applications.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Application.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an Applications message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Applications} Applications
                     */
                    Applications.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Applications)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Applications();
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.Applications.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromServer.Applications.Values: object expected");
                                message.Values[i] = $root.Jde.ApplicationServer.Web.FromServer.Application.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an Applications message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Applications} message Applications
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Applications.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.ApplicationServer.Web.FromServer.Application.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Applications to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Applications
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Applications.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Applications;
                })();

                FromServer.Status = (function() {

                    /**
                     * Properties of a Status.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IStatus
                     * @property {number|null} [ApplicationId] Status ApplicationId
                     * @property {number|null} [InstanceId] Status InstanceId
                     * @property {string|null} [HostName] Status HostName
                     * @property {number|null} [StartTime] Status StartTime
                     * @property {number|Long|null} [Memory] Status Memory
                     * @property {number|null} [LogCount] Status LogCount
                     * @property {number|null} [Cpu] Status Cpu
                     * @property {Jde.ApplicationServer.Web.FromServer.ELogLevel|null} [DBLogLevel] Status DBLogLevel
                     * @property {Jde.ApplicationServer.Web.FromServer.ELogLevel|null} [FileLogLevel] Status FileLogLevel
                     * @property {Array.<string>|null} [Values] Status Values
                     */

                    /**
                     * Constructs a new Status.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a Status.
                     * @implements IStatus
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatus=} [properties] Properties to set
                     */
                    function Status(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Status ApplicationId.
                     * @member {number} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.ApplicationId = 0;

                    /**
                     * Status InstanceId.
                     * @member {number} InstanceId
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.InstanceId = 0;

                    /**
                     * Status HostName.
                     * @member {string} HostName
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.HostName = "";

                    /**
                     * Status StartTime.
                     * @member {number} StartTime
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.StartTime = 0;

                    /**
                     * Status Memory.
                     * @member {number|Long} Memory
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.Memory = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Status LogCount.
                     * @member {number} LogCount
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.LogCount = 0;

                    /**
                     * Status Cpu.
                     * @member {number} Cpu
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.Cpu = 0;

                    /**
                     * Status DBLogLevel.
                     * @member {Jde.ApplicationServer.Web.FromServer.ELogLevel} DBLogLevel
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.DBLogLevel = 0;

                    /**
                     * Status FileLogLevel.
                     * @member {Jde.ApplicationServer.Web.FromServer.ELogLevel} FileLogLevel
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.FileLogLevel = 0;

                    /**
                     * Status Values.
                     * @member {Array.<string>} Values
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     */
                    Status.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new Status instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatus=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Status} Status instance
                     */
                    Status.create = function create(properties) {
                        return new Status(properties);
                    };

                    /**
                     * Encodes the specified Status message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Status.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatus} message Status message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Status.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ApplicationId);
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.InstanceId);
                        if (message.HostName != null && message.hasOwnProperty("HostName"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.HostName);
                        if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.StartTime);
                        if (message.Memory != null && message.hasOwnProperty("Memory"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.Memory);
                        if (message.LogCount != null && message.hasOwnProperty("LogCount"))
                            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.LogCount);
                        if (message.Cpu != null && message.hasOwnProperty("Cpu"))
                            writer.uint32(/* id 7, wireType 1 =*/57).double(message.Cpu);
                        if (message.DBLogLevel != null && message.hasOwnProperty("DBLogLevel"))
                            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.DBLogLevel);
                        if (message.FileLogLevel != null && message.hasOwnProperty("FileLogLevel"))
                            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.FileLogLevel);
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.Values[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified Status message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Status.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatus} message Status message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Status.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Status message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Status} Status
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Status.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Status();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.ApplicationId = reader.uint32();
                                break;
                            case 2:
                                message.InstanceId = reader.uint32();
                                break;
                            case 3:
                                message.HostName = reader.string();
                                break;
                            case 4:
                                message.StartTime = reader.uint32();
                                break;
                            case 5:
                                message.Memory = reader.uint64();
                                break;
                            case 6:
                                message.LogCount = reader.uint32();
                                break;
                            case 7:
                                message.Cpu = reader.double();
                                break;
                            case 8:
                                message.DBLogLevel = reader.int32();
                                break;
                            case 9:
                                message.FileLogLevel = reader.int32();
                                break;
                            case 10:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Status message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Status} Status
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Status.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Status message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Status.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId))
                                return "ApplicationId: integer expected";
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (!$util.isInteger(message.InstanceId))
                                return "InstanceId: integer expected";
                        if (message.HostName != null && message.hasOwnProperty("HostName"))
                            if (!$util.isString(message.HostName))
                                return "HostName: string expected";
                        if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                            if (!$util.isInteger(message.StartTime))
                                return "StartTime: integer expected";
                        if (message.Memory != null && message.hasOwnProperty("Memory"))
                            if (!$util.isInteger(message.Memory) && !(message.Memory && $util.isInteger(message.Memory.low) && $util.isInteger(message.Memory.high)))
                                return "Memory: integer|Long expected";
                        if (message.LogCount != null && message.hasOwnProperty("LogCount"))
                            if (!$util.isInteger(message.LogCount))
                                return "LogCount: integer expected";
                        if (message.Cpu != null && message.hasOwnProperty("Cpu"))
                            if (typeof message.Cpu !== "number")
                                return "Cpu: number expected";
                        if (message.DBLogLevel != null && message.hasOwnProperty("DBLogLevel"))
                            switch (message.DBLogLevel) {
                            default:
                                return "DBLogLevel: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        if (message.FileLogLevel != null && message.hasOwnProperty("FileLogLevel"))
                            switch (message.FileLogLevel) {
                            default:
                                return "FileLogLevel: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i)
                                if (!$util.isString(message.Values[i]))
                                    return "Values: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a Status message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Status} Status
                     */
                    Status.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Status)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Status();
                        if (object.ApplicationId != null)
                            message.ApplicationId = object.ApplicationId >>> 0;
                        if (object.InstanceId != null)
                            message.InstanceId = object.InstanceId >>> 0;
                        if (object.HostName != null)
                            message.HostName = String(object.HostName);
                        if (object.StartTime != null)
                            message.StartTime = object.StartTime >>> 0;
                        if (object.Memory != null)
                            if ($util.Long)
                                (message.Memory = $util.Long.fromValue(object.Memory)).unsigned = true;
                            else if (typeof object.Memory === "string")
                                message.Memory = parseInt(object.Memory, 10);
                            else if (typeof object.Memory === "number")
                                message.Memory = object.Memory;
                            else if (typeof object.Memory === "object")
                                message.Memory = new $util.LongBits(object.Memory.low >>> 0, object.Memory.high >>> 0).toNumber(true);
                        if (object.LogCount != null)
                            message.LogCount = object.LogCount >>> 0;
                        if (object.Cpu != null)
                            message.Cpu = Number(object.Cpu);
                        switch (object.DBLogLevel) {
                        case "Trace":
                        case 0:
                            message.DBLogLevel = 0;
                            break;
                        case "Debug":
                        case 1:
                            message.DBLogLevel = 1;
                            break;
                        case "Information":
                        case 2:
                            message.DBLogLevel = 2;
                            break;
                        case "Warning":
                        case 3:
                            message.DBLogLevel = 3;
                            break;
                        case "Error":
                        case 4:
                            message.DBLogLevel = 4;
                            break;
                        case "Critical":
                        case 5:
                            message.DBLogLevel = 5;
                            break;
                        case "None":
                        case 6:
                            message.DBLogLevel = 6;
                            break;
                        }
                        switch (object.FileLogLevel) {
                        case "Trace":
                        case 0:
                            message.FileLogLevel = 0;
                            break;
                        case "Debug":
                        case 1:
                            message.FileLogLevel = 1;
                            break;
                        case "Information":
                        case 2:
                            message.FileLogLevel = 2;
                            break;
                        case "Warning":
                        case 3:
                            message.FileLogLevel = 3;
                            break;
                        case "Error":
                        case 4:
                            message.FileLogLevel = 4;
                            break;
                        case "Critical":
                        case 5:
                            message.FileLogLevel = 5;
                            break;
                        case "None":
                        case 6:
                            message.FileLogLevel = 6;
                            break;
                        }
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.Status.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i)
                                message.Values[i] = String(object.Values[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Status message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Status} message Status
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Status.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (options.defaults) {
                            object.ApplicationId = 0;
                            object.InstanceId = 0;
                            object.HostName = "";
                            object.StartTime = 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.Memory = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.Memory = options.longs === String ? "0" : 0;
                            object.LogCount = 0;
                            object.Cpu = 0;
                            object.DBLogLevel = options.enums === String ? "Trace" : 0;
                            object.FileLogLevel = options.enums === String ? "Trace" : 0;
                        }
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            object.ApplicationId = message.ApplicationId;
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            object.InstanceId = message.InstanceId;
                        if (message.HostName != null && message.hasOwnProperty("HostName"))
                            object.HostName = message.HostName;
                        if (message.StartTime != null && message.hasOwnProperty("StartTime"))
                            object.StartTime = message.StartTime;
                        if (message.Memory != null && message.hasOwnProperty("Memory"))
                            if (typeof message.Memory === "number")
                                object.Memory = options.longs === String ? String(message.Memory) : message.Memory;
                            else
                                object.Memory = options.longs === String ? $util.Long.prototype.toString.call(message.Memory) : options.longs === Number ? new $util.LongBits(message.Memory.low >>> 0, message.Memory.high >>> 0).toNumber(true) : message.Memory;
                        if (message.LogCount != null && message.hasOwnProperty("LogCount"))
                            object.LogCount = message.LogCount;
                        if (message.Cpu != null && message.hasOwnProperty("Cpu"))
                            object.Cpu = options.json && !isFinite(message.Cpu) ? String(message.Cpu) : message.Cpu;
                        if (message.DBLogLevel != null && message.hasOwnProperty("DBLogLevel"))
                            object.DBLogLevel = options.enums === String ? $root.Jde.ApplicationServer.Web.FromServer.ELogLevel[message.DBLogLevel] : message.DBLogLevel;
                        if (message.FileLogLevel != null && message.hasOwnProperty("FileLogLevel"))
                            object.FileLogLevel = options.enums === String ? $root.Jde.ApplicationServer.Web.FromServer.ELogLevel[message.FileLogLevel] : message.FileLogLevel;
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = message.Values[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this Status to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Status
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Status.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Status;
                })();

                FromServer.Statuses = (function() {

                    /**
                     * Properties of a Statuses.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IStatuses
                     * @property {Array.<Jde.ApplicationServer.Web.FromServer.IStatus>|null} [Values] Statuses Values
                     */

                    /**
                     * Constructs a new Statuses.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a Statuses.
                     * @implements IStatuses
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatuses=} [properties] Properties to set
                     */
                    function Statuses(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Statuses Values.
                     * @member {Array.<Jde.ApplicationServer.Web.FromServer.IStatus>} Values
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @instance
                     */
                    Statuses.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new Statuses instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatuses=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Statuses} Statuses instance
                     */
                    Statuses.create = function create(properties) {
                        return new Statuses(properties);
                    };

                    /**
                     * Encodes the specified Statuses message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Statuses.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatuses} message Statuses message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Statuses.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromServer.Status.encode(message.Values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Statuses message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Statuses.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IStatuses} message Statuses message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Statuses.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Statuses message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Statuses} Statuses
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Statuses.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Statuses();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.ApplicationServer.Web.FromServer.Status.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Statuses message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Statuses} Statuses
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Statuses.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Statuses message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Statuses.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Status.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Statuses message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Statuses} Statuses
                     */
                    Statuses.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Statuses)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Statuses();
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.Statuses.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromServer.Statuses.Values: object expected");
                                message.Values[i] = $root.Jde.ApplicationServer.Web.FromServer.Status.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Statuses message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Statuses} message Statuses
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Statuses.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.ApplicationServer.Web.FromServer.Status.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Statuses to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Statuses
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Statuses.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Statuses;
                })();

                FromServer.TraceMessage = (function() {

                    /**
                     * Properties of a TraceMessage.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface ITraceMessage
                     * @property {number|Long|null} [InstanceId] TraceMessage InstanceId
                     * @property {number|Long|null} [Time] TraceMessage Time
                     * @property {Jde.ApplicationServer.Web.FromServer.ELogLevel|null} [Level] TraceMessage Level
                     * @property {number|null} [MessageId] TraceMessage MessageId
                     * @property {number|null} [FileId] TraceMessage FileId
                     * @property {number|null} [FunctionId] TraceMessage FunctionId
                     * @property {number|null} [LineNumber] TraceMessage LineNumber
                     * @property {number|null} [UserId] TraceMessage UserId
                     * @property {number|Long|null} [ThreadId] TraceMessage ThreadId
                     * @property {Array.<string>|null} [Variables] TraceMessage Variables
                     */

                    /**
                     * Constructs a new TraceMessage.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a TraceMessage.
                     * @implements ITraceMessage
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraceMessage=} [properties] Properties to set
                     */
                    function TraceMessage(properties) {
                        this.Variables = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * TraceMessage InstanceId.
                     * @member {number|Long} InstanceId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.InstanceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TraceMessage Time.
                     * @member {number|Long} Time
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.Time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TraceMessage Level.
                     * @member {Jde.ApplicationServer.Web.FromServer.ELogLevel} Level
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.Level = 0;

                    /**
                     * TraceMessage MessageId.
                     * @member {number} MessageId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.MessageId = 0;

                    /**
                     * TraceMessage FileId.
                     * @member {number} FileId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.FileId = 0;

                    /**
                     * TraceMessage FunctionId.
                     * @member {number} FunctionId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.FunctionId = 0;

                    /**
                     * TraceMessage LineNumber.
                     * @member {number} LineNumber
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.LineNumber = 0;

                    /**
                     * TraceMessage UserId.
                     * @member {number} UserId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.UserId = 0;

                    /**
                     * TraceMessage ThreadId.
                     * @member {number|Long} ThreadId
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.ThreadId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * TraceMessage Variables.
                     * @member {Array.<string>} Variables
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     */
                    TraceMessage.prototype.Variables = $util.emptyArray;

                    /**
                     * Creates a new TraceMessage instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraceMessage=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.TraceMessage} TraceMessage instance
                     */
                    TraceMessage.create = function create(properties) {
                        return new TraceMessage(properties);
                    };

                    /**
                     * Encodes the specified TraceMessage message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.TraceMessage.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraceMessage} message TraceMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TraceMessage.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.InstanceId);
                        if (message.Time != null && message.hasOwnProperty("Time"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.Time);
                        if (message.Level != null && message.hasOwnProperty("Level"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Level);
                        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.MessageId);
                        if (message.FileId != null && message.hasOwnProperty("FileId"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.FileId);
                        if (message.FunctionId != null && message.hasOwnProperty("FunctionId"))
                            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.FunctionId);
                        if (message.LineNumber != null && message.hasOwnProperty("LineNumber"))
                            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.LineNumber);
                        if (message.UserId != null && message.hasOwnProperty("UserId"))
                            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.UserId);
                        if (message.ThreadId != null && message.hasOwnProperty("ThreadId"))
                            writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.ThreadId);
                        if (message.Variables != null && message.Variables.length)
                            for (let i = 0; i < message.Variables.length; ++i)
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.Variables[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified TraceMessage message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.TraceMessage.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraceMessage} message TraceMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TraceMessage.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a TraceMessage message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.TraceMessage} TraceMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TraceMessage.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.TraceMessage();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.InstanceId = reader.uint64();
                                break;
                            case 2:
                                message.Time = reader.uint64();
                                break;
                            case 3:
                                message.Level = reader.int32();
                                break;
                            case 4:
                                message.MessageId = reader.uint32();
                                break;
                            case 5:
                                message.FileId = reader.uint32();
                                break;
                            case 6:
                                message.FunctionId = reader.uint32();
                                break;
                            case 7:
                                message.LineNumber = reader.uint32();
                                break;
                            case 8:
                                message.UserId = reader.uint32();
                                break;
                            case 9:
                                message.ThreadId = reader.uint64();
                                break;
                            case 10:
                                if (!(message.Variables && message.Variables.length))
                                    message.Variables = [];
                                message.Variables.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a TraceMessage message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.TraceMessage} TraceMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TraceMessage.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a TraceMessage message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TraceMessage.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (!$util.isInteger(message.InstanceId) && !(message.InstanceId && $util.isInteger(message.InstanceId.low) && $util.isInteger(message.InstanceId.high)))
                                return "InstanceId: integer|Long expected";
                        if (message.Time != null && message.hasOwnProperty("Time"))
                            if (!$util.isInteger(message.Time) && !(message.Time && $util.isInteger(message.Time.low) && $util.isInteger(message.Time.high)))
                                return "Time: integer|Long expected";
                        if (message.Level != null && message.hasOwnProperty("Level"))
                            switch (message.Level) {
                            default:
                                return "Level: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                break;
                            }
                        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
                            if (!$util.isInteger(message.MessageId))
                                return "MessageId: integer expected";
                        if (message.FileId != null && message.hasOwnProperty("FileId"))
                            if (!$util.isInteger(message.FileId))
                                return "FileId: integer expected";
                        if (message.FunctionId != null && message.hasOwnProperty("FunctionId"))
                            if (!$util.isInteger(message.FunctionId))
                                return "FunctionId: integer expected";
                        if (message.LineNumber != null && message.hasOwnProperty("LineNumber"))
                            if (!$util.isInteger(message.LineNumber))
                                return "LineNumber: integer expected";
                        if (message.UserId != null && message.hasOwnProperty("UserId"))
                            if (!$util.isInteger(message.UserId))
                                return "UserId: integer expected";
                        if (message.ThreadId != null && message.hasOwnProperty("ThreadId"))
                            if (!$util.isInteger(message.ThreadId) && !(message.ThreadId && $util.isInteger(message.ThreadId.low) && $util.isInteger(message.ThreadId.high)))
                                return "ThreadId: integer|Long expected";
                        if (message.Variables != null && message.hasOwnProperty("Variables")) {
                            if (!Array.isArray(message.Variables))
                                return "Variables: array expected";
                            for (let i = 0; i < message.Variables.length; ++i)
                                if (!$util.isString(message.Variables[i]))
                                    return "Variables: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a TraceMessage message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.TraceMessage} TraceMessage
                     */
                    TraceMessage.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.TraceMessage)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.TraceMessage();
                        if (object.InstanceId != null)
                            if ($util.Long)
                                (message.InstanceId = $util.Long.fromValue(object.InstanceId)).unsigned = true;
                            else if (typeof object.InstanceId === "string")
                                message.InstanceId = parseInt(object.InstanceId, 10);
                            else if (typeof object.InstanceId === "number")
                                message.InstanceId = object.InstanceId;
                            else if (typeof object.InstanceId === "object")
                                message.InstanceId = new $util.LongBits(object.InstanceId.low >>> 0, object.InstanceId.high >>> 0).toNumber(true);
                        if (object.Time != null)
                            if ($util.Long)
                                (message.Time = $util.Long.fromValue(object.Time)).unsigned = true;
                            else if (typeof object.Time === "string")
                                message.Time = parseInt(object.Time, 10);
                            else if (typeof object.Time === "number")
                                message.Time = object.Time;
                            else if (typeof object.Time === "object")
                                message.Time = new $util.LongBits(object.Time.low >>> 0, object.Time.high >>> 0).toNumber(true);
                        switch (object.Level) {
                        case "Trace":
                        case 0:
                            message.Level = 0;
                            break;
                        case "Debug":
                        case 1:
                            message.Level = 1;
                            break;
                        case "Information":
                        case 2:
                            message.Level = 2;
                            break;
                        case "Warning":
                        case 3:
                            message.Level = 3;
                            break;
                        case "Error":
                        case 4:
                            message.Level = 4;
                            break;
                        case "Critical":
                        case 5:
                            message.Level = 5;
                            break;
                        case "None":
                        case 6:
                            message.Level = 6;
                            break;
                        }
                        if (object.MessageId != null)
                            message.MessageId = object.MessageId >>> 0;
                        if (object.FileId != null)
                            message.FileId = object.FileId >>> 0;
                        if (object.FunctionId != null)
                            message.FunctionId = object.FunctionId >>> 0;
                        if (object.LineNumber != null)
                            message.LineNumber = object.LineNumber >>> 0;
                        if (object.UserId != null)
                            message.UserId = object.UserId >>> 0;
                        if (object.ThreadId != null)
                            if ($util.Long)
                                (message.ThreadId = $util.Long.fromValue(object.ThreadId)).unsigned = true;
                            else if (typeof object.ThreadId === "string")
                                message.ThreadId = parseInt(object.ThreadId, 10);
                            else if (typeof object.ThreadId === "number")
                                message.ThreadId = object.ThreadId;
                            else if (typeof object.ThreadId === "object")
                                message.ThreadId = new $util.LongBits(object.ThreadId.low >>> 0, object.ThreadId.high >>> 0).toNumber(true);
                        if (object.Variables) {
                            if (!Array.isArray(object.Variables))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.TraceMessage.Variables: array expected");
                            message.Variables = [];
                            for (let i = 0; i < object.Variables.length; ++i)
                                message.Variables[i] = String(object.Variables[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a TraceMessage message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.TraceMessage} message TraceMessage
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TraceMessage.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Variables = [];
                        if (options.defaults) {
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.InstanceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.InstanceId = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.Time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.Time = options.longs === String ? "0" : 0;
                            object.Level = options.enums === String ? "Trace" : 0;
                            object.MessageId = 0;
                            object.FileId = 0;
                            object.FunctionId = 0;
                            object.LineNumber = 0;
                            object.UserId = 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.ThreadId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.ThreadId = options.longs === String ? "0" : 0;
                        }
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (typeof message.InstanceId === "number")
                                object.InstanceId = options.longs === String ? String(message.InstanceId) : message.InstanceId;
                            else
                                object.InstanceId = options.longs === String ? $util.Long.prototype.toString.call(message.InstanceId) : options.longs === Number ? new $util.LongBits(message.InstanceId.low >>> 0, message.InstanceId.high >>> 0).toNumber(true) : message.InstanceId;
                        if (message.Time != null && message.hasOwnProperty("Time"))
                            if (typeof message.Time === "number")
                                object.Time = options.longs === String ? String(message.Time) : message.Time;
                            else
                                object.Time = options.longs === String ? $util.Long.prototype.toString.call(message.Time) : options.longs === Number ? new $util.LongBits(message.Time.low >>> 0, message.Time.high >>> 0).toNumber(true) : message.Time;
                        if (message.Level != null && message.hasOwnProperty("Level"))
                            object.Level = options.enums === String ? $root.Jde.ApplicationServer.Web.FromServer.ELogLevel[message.Level] : message.Level;
                        if (message.MessageId != null && message.hasOwnProperty("MessageId"))
                            object.MessageId = message.MessageId;
                        if (message.FileId != null && message.hasOwnProperty("FileId"))
                            object.FileId = message.FileId;
                        if (message.FunctionId != null && message.hasOwnProperty("FunctionId"))
                            object.FunctionId = message.FunctionId;
                        if (message.LineNumber != null && message.hasOwnProperty("LineNumber"))
                            object.LineNumber = message.LineNumber;
                        if (message.UserId != null && message.hasOwnProperty("UserId"))
                            object.UserId = message.UserId;
                        if (message.ThreadId != null && message.hasOwnProperty("ThreadId"))
                            if (typeof message.ThreadId === "number")
                                object.ThreadId = options.longs === String ? String(message.ThreadId) : message.ThreadId;
                            else
                                object.ThreadId = options.longs === String ? $util.Long.prototype.toString.call(message.ThreadId) : options.longs === Number ? new $util.LongBits(message.ThreadId.low >>> 0, message.ThreadId.high >>> 0).toNumber(true) : message.ThreadId;
                        if (message.Variables && message.Variables.length) {
                            object.Variables = [];
                            for (let j = 0; j < message.Variables.length; ++j)
                                object.Variables[j] = message.Variables[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this TraceMessage to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.TraceMessage
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TraceMessage.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return TraceMessage;
                })();

                FromServer.Traces = (function() {

                    /**
                     * Properties of a Traces.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface ITraces
                     * @property {number|null} [ApplicationId] Traces ApplicationId
                     * @property {Array.<Jde.ApplicationServer.Web.FromServer.ITraceMessage>|null} [Values] Traces Values
                     */

                    /**
                     * Constructs a new Traces.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a Traces.
                     * @implements ITraces
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraces=} [properties] Properties to set
                     */
                    function Traces(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Traces ApplicationId.
                     * @member {number} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @instance
                     */
                    Traces.prototype.ApplicationId = 0;

                    /**
                     * Traces Values.
                     * @member {Array.<Jde.ApplicationServer.Web.FromServer.ITraceMessage>} Values
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @instance
                     */
                    Traces.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new Traces instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraces=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Traces} Traces instance
                     */
                    Traces.create = function create(properties) {
                        return new Traces(properties);
                    };

                    /**
                     * Encodes the specified Traces message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Traces.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraces} message Traces message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Traces.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ApplicationId);
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromServer.TraceMessage.encode(message.Values[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Traces message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Traces.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITraces} message Traces message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Traces.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Traces message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Traces} Traces
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Traces.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Traces();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.ApplicationId = reader.uint32();
                                break;
                            case 2:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.ApplicationServer.Web.FromServer.TraceMessage.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Traces message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Traces} Traces
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Traces.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Traces message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Traces.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId))
                                return "ApplicationId: integer expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.TraceMessage.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Traces message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Traces} Traces
                     */
                    Traces.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Traces)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Traces();
                        if (object.ApplicationId != null)
                            message.ApplicationId = object.ApplicationId >>> 0;
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.Traces.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromServer.Traces.Values: object expected");
                                message.Values[i] = $root.Jde.ApplicationServer.Web.FromServer.TraceMessage.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Traces message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Traces} message Traces
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Traces.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (options.defaults)
                            object.ApplicationId = 0;
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            object.ApplicationId = message.ApplicationId;
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.ApplicationServer.Web.FromServer.TraceMessage.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Traces to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Traces
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Traces.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Traces;
                })();

                FromServer.ApplicationString = (function() {

                    /**
                     * Properties of an ApplicationString.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IApplicationString
                     * @property {number|null} [StringRequestType] ApplicationString StringRequestType
                     * @property {number|null} [Id] ApplicationString Id
                     * @property {string|null} [Value] ApplicationString Value
                     */

                    /**
                     * Constructs a new ApplicationString.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an ApplicationString.
                     * @implements IApplicationString
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationString=} [properties] Properties to set
                     */
                    function ApplicationString(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ApplicationString StringRequestType.
                     * @member {number} StringRequestType
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @instance
                     */
                    ApplicationString.prototype.StringRequestType = 0;

                    /**
                     * ApplicationString Id.
                     * @member {number} Id
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @instance
                     */
                    ApplicationString.prototype.Id = 0;

                    /**
                     * ApplicationString Value.
                     * @member {string} Value
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @instance
                     */
                    ApplicationString.prototype.Value = "";

                    /**
                     * Creates a new ApplicationString instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationString=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationString} ApplicationString instance
                     */
                    ApplicationString.create = function create(properties) {
                        return new ApplicationString(properties);
                    };

                    /**
                     * Encodes the specified ApplicationString message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationString.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationString} message ApplicationString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ApplicationString.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.StringRequestType != null && message.hasOwnProperty("StringRequestType"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.StringRequestType);
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.Id);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified ApplicationString message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationString.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationString} message ApplicationString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ApplicationString.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an ApplicationString message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationString} ApplicationString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ApplicationString.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.ApplicationString();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.StringRequestType = reader.uint32();
                                break;
                            case 2:
                                message.Id = reader.uint32();
                                break;
                            case 3:
                                message.Value = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an ApplicationString message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationString} ApplicationString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ApplicationString.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an ApplicationString message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ApplicationString.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.StringRequestType != null && message.hasOwnProperty("StringRequestType"))
                            if (!$util.isInteger(message.StringRequestType))
                                return "StringRequestType: integer expected";
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            if (!$util.isInteger(message.Id))
                                return "Id: integer expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isString(message.Value))
                                return "Value: string expected";
                        return null;
                    };

                    /**
                     * Creates an ApplicationString message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationString} ApplicationString
                     */
                    ApplicationString.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.ApplicationString)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.ApplicationString();
                        if (object.StringRequestType != null)
                            message.StringRequestType = object.StringRequestType >>> 0;
                        if (object.Id != null)
                            message.Id = object.Id >>> 0;
                        if (object.Value != null)
                            message.Value = String(object.Value);
                        return message;
                    };

                    /**
                     * Creates a plain object from an ApplicationString message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ApplicationString} message ApplicationString
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ApplicationString.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.StringRequestType = 0;
                            object.Id = 0;
                            object.Value = "";
                        }
                        if (message.StringRequestType != null && message.hasOwnProperty("StringRequestType"))
                            object.StringRequestType = message.StringRequestType;
                        if (message.Id != null && message.hasOwnProperty("Id"))
                            object.Id = message.Id;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        return object;
                    };

                    /**
                     * Converts this ApplicationString to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationString
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ApplicationString.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ApplicationString;
                })();

                FromServer.ApplicationStrings = (function() {

                    /**
                     * Properties of an ApplicationStrings.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IApplicationStrings
                     * @property {number|null} [RequestId] ApplicationStrings RequestId
                     * @property {number|null} [ApplicationId] ApplicationStrings ApplicationId
                     * @property {Array.<Jde.ApplicationServer.Web.FromServer.IApplicationString>|null} [Values] ApplicationStrings Values
                     */

                    /**
                     * Constructs a new ApplicationStrings.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an ApplicationStrings.
                     * @implements IApplicationStrings
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationStrings=} [properties] Properties to set
                     */
                    function ApplicationStrings(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ApplicationStrings RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @instance
                     */
                    ApplicationStrings.prototype.RequestId = 0;

                    /**
                     * ApplicationStrings ApplicationId.
                     * @member {number} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @instance
                     */
                    ApplicationStrings.prototype.ApplicationId = 0;

                    /**
                     * ApplicationStrings Values.
                     * @member {Array.<Jde.ApplicationServer.Web.FromServer.IApplicationString>} Values
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @instance
                     */
                    ApplicationStrings.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new ApplicationStrings instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationStrings=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationStrings} ApplicationStrings instance
                     */
                    ApplicationStrings.create = function create(properties) {
                        return new ApplicationStrings(properties);
                    };

                    /**
                     * Encodes the specified ApplicationStrings message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationStrings.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationStrings} message ApplicationStrings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ApplicationStrings.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.ApplicationId);
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromServer.ApplicationString.encode(message.Values[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified ApplicationStrings message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationStrings.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IApplicationStrings} message ApplicationStrings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ApplicationStrings.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an ApplicationStrings message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationStrings} ApplicationStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ApplicationStrings.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                message.ApplicationId = reader.uint32();
                                break;
                            case 3:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.ApplicationServer.Web.FromServer.ApplicationString.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an ApplicationStrings message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationStrings} ApplicationStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ApplicationStrings.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an ApplicationStrings message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ApplicationStrings.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId))
                                return "ApplicationId: integer expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.ApplicationString.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates an ApplicationStrings message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.ApplicationStrings} ApplicationStrings
                     */
                    ApplicationStrings.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.ApplicationId != null)
                            message.ApplicationId = object.ApplicationId >>> 0;
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.ApplicationStrings.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromServer.ApplicationStrings.Values: object expected");
                                message.Values[i] = $root.Jde.ApplicationServer.Web.FromServer.ApplicationString.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from an ApplicationStrings message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ApplicationStrings} message ApplicationStrings
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ApplicationStrings.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.ApplicationId = 0;
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            object.ApplicationId = message.ApplicationId;
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.ApplicationServer.Web.FromServer.ApplicationString.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this ApplicationStrings to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.ApplicationStrings
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ApplicationStrings.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ApplicationStrings;
                })();

                FromServer.ErrorMessage = (function() {

                    /**
                     * Properties of an ErrorMessage.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IErrorMessage
                     * @property {number|null} [RequestId] ErrorMessage RequestId
                     * @property {string|null} [Message] ErrorMessage Message
                     */

                    /**
                     * Constructs a new ErrorMessage.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents an ErrorMessage.
                     * @implements IErrorMessage
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IErrorMessage=} [properties] Properties to set
                     */
                    function ErrorMessage(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ErrorMessage RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @instance
                     */
                    ErrorMessage.prototype.RequestId = 0;

                    /**
                     * ErrorMessage Message.
                     * @member {string} Message
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @instance
                     */
                    ErrorMessage.prototype.Message = "";

                    /**
                     * Creates a new ErrorMessage instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IErrorMessage=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.ErrorMessage} ErrorMessage instance
                     */
                    ErrorMessage.create = function create(properties) {
                        return new ErrorMessage(properties);
                    };

                    /**
                     * Encodes the specified ErrorMessage message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ErrorMessage.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IErrorMessage} message ErrorMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ErrorMessage.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Message);
                        return writer;
                    };

                    /**
                     * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ErrorMessage.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IErrorMessage} message ErrorMessage message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes an ErrorMessage message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.ErrorMessage} ErrorMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ErrorMessage.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                message.Message = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.ErrorMessage} ErrorMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies an ErrorMessage message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ErrorMessage.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            if (!$util.isString(message.Message))
                                return "Message: string expected";
                        return null;
                    };

                    /**
                     * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.ErrorMessage} ErrorMessage
                     */
                    ErrorMessage.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.Message != null)
                            message.Message = String(object.Message);
                        return message;
                    };

                    /**
                     * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ErrorMessage} message ErrorMessage
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ErrorMessage.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.Message = "";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            object.Message = message.Message;
                        return object;
                    };

                    /**
                     * Converts this ErrorMessage to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.ErrorMessage
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ErrorMessage.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return ErrorMessage;
                })();

                FromServer.Custom = (function() {

                    /**
                     * Properties of a Custom.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface ICustom
                     * @property {number|null} [RequestId] Custom RequestId
                     * @property {Uint8Array|null} [Message] Custom Message
                     */

                    /**
                     * Constructs a new Custom.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a Custom.
                     * @implements ICustom
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.ICustom=} [properties] Properties to set
                     */
                    function Custom(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Custom RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @instance
                     */
                    Custom.prototype.RequestId = 0;

                    /**
                     * Custom Message.
                     * @member {Uint8Array} Message
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @instance
                     */
                    Custom.prototype.Message = $util.newBuffer([]);

                    /**
                     * Creates a new Custom instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ICustom=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Custom} Custom instance
                     */
                    Custom.create = function create(properties) {
                        return new Custom(properties);
                    };

                    /**
                     * Encodes the specified Custom message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Custom.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ICustom} message Custom message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Custom.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.Message);
                        return writer;
                    };

                    /**
                     * Encodes the specified Custom message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Custom.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ICustom} message Custom message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Custom.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Custom message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Custom} Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Custom.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Custom();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                message.Message = reader.bytes();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Custom message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Custom} Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Custom.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Custom message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Custom.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                                return "Message: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a Custom message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Custom} Custom
                     */
                    Custom.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Custom)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Custom();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.Message != null)
                            if (typeof object.Message === "string")
                                $util.base64.decode(object.Message, message.Message = $util.newBuffer($util.base64.length(object.Message)), 0);
                            else if (object.Message.length)
                                message.Message = object.Message;
                        return message;
                    };

                    /**
                     * Creates a plain object from a Custom message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Custom} message Custom
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Custom.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            if (options.bytes === String)
                                object.Message = "";
                            else {
                                object.Message = [];
                                if (options.bytes !== Array)
                                    object.Message = $util.newBuffer(object.Message);
                            }
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
                        return object;
                    };

                    /**
                     * Converts this Custom to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Custom
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Custom.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Custom;
                })();

                FromServer.MessageUnion = (function() {

                    /**
                     * Properties of a MessageUnion.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface IMessageUnion
                     * @property {Jde.ApplicationServer.Web.FromServer.ITraces|null} [Traces] MessageUnion Traces
                     * @property {Jde.ApplicationServer.Web.FromServer.IStatuses|null} [Statuses] MessageUnion Statuses
                     * @property {Jde.ApplicationServer.Web.FromServer.IAcknowledgement|null} [Acknowledgement] MessageUnion Acknowledgement
                     * @property {Jde.ApplicationServer.Web.FromServer.IApplicationStrings|null} [Strings] MessageUnion Strings
                     * @property {Jde.ApplicationServer.Web.FromServer.IApplications|null} [Applications] MessageUnion Applications
                     * @property {Jde.ApplicationServer.Web.FromServer.IErrorMessage|null} [Error] MessageUnion Error
                     * @property {Jde.ApplicationServer.Web.FromServer.ICustom|null} [Custom] MessageUnion Custom
                     */

                    /**
                     * Constructs a new MessageUnion.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a MessageUnion.
                     * @implements IMessageUnion
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.IMessageUnion=} [properties] Properties to set
                     */
                    function MessageUnion(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MessageUnion Traces.
                     * @member {Jde.ApplicationServer.Web.FromServer.ITraces|null|undefined} Traces
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Traces = null;

                    /**
                     * MessageUnion Statuses.
                     * @member {Jde.ApplicationServer.Web.FromServer.IStatuses|null|undefined} Statuses
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Statuses = null;

                    /**
                     * MessageUnion Acknowledgement.
                     * @member {Jde.ApplicationServer.Web.FromServer.IAcknowledgement|null|undefined} Acknowledgement
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Acknowledgement = null;

                    /**
                     * MessageUnion Strings.
                     * @member {Jde.ApplicationServer.Web.FromServer.IApplicationStrings|null|undefined} Strings
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Strings = null;

                    /**
                     * MessageUnion Applications.
                     * @member {Jde.ApplicationServer.Web.FromServer.IApplications|null|undefined} Applications
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Applications = null;

                    /**
                     * MessageUnion Error.
                     * @member {Jde.ApplicationServer.Web.FromServer.IErrorMessage|null|undefined} Error
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Error = null;

                    /**
                     * MessageUnion Custom.
                     * @member {Jde.ApplicationServer.Web.FromServer.ICustom|null|undefined} Custom
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Custom = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * MessageUnion Value.
                     * @member {"Traces"|"Statuses"|"Acknowledgement"|"Strings"|"Applications"|"Error"|"Custom"|undefined} Value
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     */
                    Object.defineProperty(MessageUnion.prototype, "Value", {
                        get: $util.oneOfGetter($oneOfFields = ["Traces", "Statuses", "Acknowledgement", "Strings", "Applications", "Error", "Custom"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IMessageUnion=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.MessageUnion} MessageUnion instance
                     */
                    MessageUnion.create = function create(properties) {
                        return new MessageUnion(properties);
                    };

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.MessageUnion.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Traces != null && message.hasOwnProperty("Traces"))
                            $root.Jde.ApplicationServer.Web.FromServer.Traces.encode(message.Traces, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.Statuses != null && message.hasOwnProperty("Statuses"))
                            $root.Jde.ApplicationServer.Web.FromServer.Statuses.encode(message.Statuses, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.Acknowledgement != null && message.hasOwnProperty("Acknowledgement"))
                            $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement.encode(message.Acknowledgement, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.Strings != null && message.hasOwnProperty("Strings"))
                            $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings.encode(message.Strings, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.Applications != null && message.hasOwnProperty("Applications"))
                            $root.Jde.ApplicationServer.Web.FromServer.Applications.encode(message.Applications, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.Error != null && message.hasOwnProperty("Error"))
                            $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage.encode(message.Error, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.Custom != null && message.hasOwnProperty("Custom"))
                            $root.Jde.ApplicationServer.Web.FromServer.Custom.encode(message.Custom, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.MessageUnion.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.MessageUnion} MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageUnion.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.MessageUnion();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Traces = $root.Jde.ApplicationServer.Web.FromServer.Traces.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.Statuses = $root.Jde.ApplicationServer.Web.FromServer.Statuses.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.Acknowledgement = $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.Strings = $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.Applications = $root.Jde.ApplicationServer.Web.FromServer.Applications.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.Error = $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage.decode(reader, reader.uint32());
                                break;
                            case 7:
                                message.Custom = $root.Jde.ApplicationServer.Web.FromServer.Custom.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.MessageUnion} MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageUnion.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a MessageUnion message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MessageUnion.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.Traces != null && message.hasOwnProperty("Traces")) {
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Traces.verify(message.Traces);
                                if (error)
                                    return "Traces." + error;
                            }
                        }
                        if (message.Statuses != null && message.hasOwnProperty("Statuses")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Statuses.verify(message.Statuses);
                                if (error)
                                    return "Statuses." + error;
                            }
                        }
                        if (message.Acknowledgement != null && message.hasOwnProperty("Acknowledgement")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement.verify(message.Acknowledgement);
                                if (error)
                                    return "Acknowledgement." + error;
                            }
                        }
                        if (message.Strings != null && message.hasOwnProperty("Strings")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings.verify(message.Strings);
                                if (error)
                                    return "Strings." + error;
                            }
                        }
                        if (message.Applications != null && message.hasOwnProperty("Applications")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Applications.verify(message.Applications);
                                if (error)
                                    return "Applications." + error;
                            }
                        }
                        if (message.Error != null && message.hasOwnProperty("Error")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage.verify(message.Error);
                                if (error)
                                    return "Error." + error;
                            }
                        }
                        if (message.Custom != null && message.hasOwnProperty("Custom")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.Custom.verify(message.Custom);
                                if (error)
                                    return "Custom." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a MessageUnion message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.MessageUnion} MessageUnion
                     */
                    MessageUnion.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.MessageUnion)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.MessageUnion();
                        if (object.Traces != null) {
                            if (typeof object.Traces !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Traces: object expected");
                            message.Traces = $root.Jde.ApplicationServer.Web.FromServer.Traces.fromObject(object.Traces);
                        }
                        if (object.Statuses != null) {
                            if (typeof object.Statuses !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Statuses: object expected");
                            message.Statuses = $root.Jde.ApplicationServer.Web.FromServer.Statuses.fromObject(object.Statuses);
                        }
                        if (object.Acknowledgement != null) {
                            if (typeof object.Acknowledgement !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Acknowledgement: object expected");
                            message.Acknowledgement = $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement.fromObject(object.Acknowledgement);
                        }
                        if (object.Strings != null) {
                            if (typeof object.Strings !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Strings: object expected");
                            message.Strings = $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings.fromObject(object.Strings);
                        }
                        if (object.Applications != null) {
                            if (typeof object.Applications !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Applications: object expected");
                            message.Applications = $root.Jde.ApplicationServer.Web.FromServer.Applications.fromObject(object.Applications);
                        }
                        if (object.Error != null) {
                            if (typeof object.Error !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Error: object expected");
                            message.Error = $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage.fromObject(object.Error);
                        }
                        if (object.Custom != null) {
                            if (typeof object.Custom !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.MessageUnion.Custom: object expected");
                            message.Custom = $root.Jde.ApplicationServer.Web.FromServer.Custom.fromObject(object.Custom);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.MessageUnion} message MessageUnion
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MessageUnion.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (message.Traces != null && message.hasOwnProperty("Traces")) {
                            object.Traces = $root.Jde.ApplicationServer.Web.FromServer.Traces.toObject(message.Traces, options);
                            if (options.oneofs)
                                object.Value = "Traces";
                        }
                        if (message.Statuses != null && message.hasOwnProperty("Statuses")) {
                            object.Statuses = $root.Jde.ApplicationServer.Web.FromServer.Statuses.toObject(message.Statuses, options);
                            if (options.oneofs)
                                object.Value = "Statuses";
                        }
                        if (message.Acknowledgement != null && message.hasOwnProperty("Acknowledgement")) {
                            object.Acknowledgement = $root.Jde.ApplicationServer.Web.FromServer.Acknowledgement.toObject(message.Acknowledgement, options);
                            if (options.oneofs)
                                object.Value = "Acknowledgement";
                        }
                        if (message.Strings != null && message.hasOwnProperty("Strings")) {
                            object.Strings = $root.Jde.ApplicationServer.Web.FromServer.ApplicationStrings.toObject(message.Strings, options);
                            if (options.oneofs)
                                object.Value = "Strings";
                        }
                        if (message.Applications != null && message.hasOwnProperty("Applications")) {
                            object.Applications = $root.Jde.ApplicationServer.Web.FromServer.Applications.toObject(message.Applications, options);
                            if (options.oneofs)
                                object.Value = "Applications";
                        }
                        if (message.Error != null && message.hasOwnProperty("Error")) {
                            object.Error = $root.Jde.ApplicationServer.Web.FromServer.ErrorMessage.toObject(message.Error, options);
                            if (options.oneofs)
                                object.Value = "Error";
                        }
                        if (message.Custom != null && message.hasOwnProperty("Custom")) {
                            object.Custom = $root.Jde.ApplicationServer.Web.FromServer.Custom.toObject(message.Custom, options);
                            if (options.oneofs)
                                object.Value = "Custom";
                        }
                        return object;
                    };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.MessageUnion
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MessageUnion.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return MessageUnion;
                })();

                FromServer.Transmission = (function() {

                    /**
                     * Properties of a Transmission.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @interface ITransmission
                     * @property {Array.<Jde.ApplicationServer.Web.FromServer.IMessageUnion>|null} [Messages] Transmission Messages
                     */

                    /**
                     * Constructs a new Transmission.
                     * @memberof Jde.ApplicationServer.Web.FromServer
                     * @classdesc Represents a Transmission.
                     * @implements ITransmission
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromServer.ITransmission=} [properties] Properties to set
                     */
                    function Transmission(properties) {
                        this.Messages = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Transmission Messages.
                     * @member {Array.<Jde.ApplicationServer.Web.FromServer.IMessageUnion>} Messages
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @instance
                     */
                    Transmission.prototype.Messages = $util.emptyArray;

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITransmission=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromServer.Transmission} Transmission instance
                     */
                    Transmission.create = function create(properties) {
                        return new Transmission(properties);
                    };

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Transmission.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Messages != null && message.Messages.length)
                            for (let i = 0; i < message.Messages.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromServer.MessageUnion.encode(message.Messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Transmission.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromServer.Transmission} Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transmission.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromServer.Transmission();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.Messages && message.Messages.length))
                                    message.Messages = [];
                                message.Messages.push($root.Jde.ApplicationServer.Web.FromServer.MessageUnion.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Transmission message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromServer.Transmission} Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transmission.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Transmission message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Transmission.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Messages != null && message.hasOwnProperty("Messages")) {
                            if (!Array.isArray(message.Messages))
                                return "Messages: array expected";
                            for (let i = 0; i < message.Messages.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromServer.MessageUnion.verify(message.Messages[i]);
                                if (error)
                                    return "Messages." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Transmission message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromServer.Transmission} Transmission
                     */
                    Transmission.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromServer.Transmission)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromServer.Transmission();
                        if (object.Messages) {
                            if (!Array.isArray(object.Messages))
                                throw TypeError(".Jde.ApplicationServer.Web.FromServer.Transmission.Messages: array expected");
                            message.Messages = [];
                            for (let i = 0; i < object.Messages.length; ++i) {
                                if (typeof object.Messages[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromServer.Transmission.Messages: object expected");
                                message.Messages[i] = $root.Jde.ApplicationServer.Web.FromServer.MessageUnion.fromObject(object.Messages[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromServer.Transmission} message Transmission
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Transmission.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Messages = [];
                        if (message.Messages && message.Messages.length) {
                            object.Messages = [];
                            for (let j = 0; j < message.Messages.length; ++j)
                                object.Messages[j] = $root.Jde.ApplicationServer.Web.FromServer.MessageUnion.toObject(message.Messages[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Transmission to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromServer.Transmission
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Transmission.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Transmission;
                })();

                return FromServer;
            })();

            return Web;
        })();

        return ApplicationServer;
    })();

    return Jde;
})();

export { $root as default };
