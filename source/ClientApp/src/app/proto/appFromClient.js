/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots.app_from_client || ($protobuf.roots.app_from_client = {});

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

            Web.FromClient = (function() {

                /**
                 * Namespace FromClient.
                 * @memberof Jde.ApplicationServer.Web
                 * @namespace
                 */
                const FromClient = {};

                /**
                 * ERequest enum.
                 * @name Jde.ApplicationServer.Web.FromClient.ERequest
                 * @enum {string}
                 * @property {number} Ping=0 Ping value
                 * @property {number} Negate=-1 Negate value
                 * @property {number} Statuses=1 Statuses value
                 * @property {number} Power=2 Power value
                 * @property {number} Logs=3 Logs value
                 * @property {number} Applications=4 Applications value
                 */
                FromClient.ERequest = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "Ping"] = 0;
                    values[valuesById[-1] = "Negate"] = -1;
                    values[valuesById[1] = "Statuses"] = 1;
                    values[valuesById[2] = "Power"] = 2;
                    values[valuesById[3] = "Logs"] = 3;
                    values[valuesById[4] = "Applications"] = 4;
                    return values;
                })();

                FromClient.Request = (function() {

                    /**
                     * Properties of a Request.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IRequest
                     * @property {Jde.ApplicationServer.Web.FromClient.ERequest|null} [Value] Request Value
                     */

                    /**
                     * Constructs a new Request.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a Request.
                     * @implements IRequest
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequest=} [properties] Properties to set
                     */
                    function Request(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * Request Value.
                     * @member {Jde.ApplicationServer.Web.FromClient.ERequest} Value
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @instance
                     */
                    Request.prototype.Value = 0;

                    /**
                     * Creates a new Request instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequest=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.Request} Request instance
                     */
                    Request.create = function create(properties) {
                        return new Request(properties);
                    };

                    /**
                     * Encodes the specified Request message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Request.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequest} message Request message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Request.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified Request message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Request.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequest} message Request message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Request.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Request message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.Request} Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Request.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.Request();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Value = reader.int32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a Request message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.Request} Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Request.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a Request message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Request.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            switch (message.Value) {
                            default:
                                return "Value: enum value expected";
                            case 0:
                            case -1:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                break;
                            }
                        return null;
                    };

                    /**
                     * Creates a Request message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.Request} Request
                     */
                    Request.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.Request)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.Request();
                        switch (object.Value) {
                        case "Ping":
                        case 0:
                            message.Value = 0;
                            break;
                        case "Negate":
                        case -1:
                            message.Value = -1;
                            break;
                        case "Statuses":
                        case 1:
                            message.Value = 1;
                            break;
                        case "Power":
                        case 2:
                            message.Value = 2;
                            break;
                        case "Logs":
                        case 3:
                            message.Value = 3;
                            break;
                        case "Applications":
                        case 4:
                            message.Value = 4;
                            break;
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Request message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.Request} message Request
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Request.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults)
                            object.Value = options.enums === String ? "Ping" : 0;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = options.enums === String ? $root.Jde.ApplicationServer.Web.FromClient.ERequest[message.Value] : message.Value;
                        return object;
                    };

                    /**
                     * Converts this Request to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.Request
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Request.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Request;
                })();

                FromClient.RequestId = (function() {

                    /**
                     * Properties of a RequestId.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IRequestId
                     * @property {Jde.ApplicationServer.Web.FromClient.ERequest|null} [Value] RequestId Value
                     * @property {number|Long|null} [InstanceId] RequestId InstanceId
                     */

                    /**
                     * Constructs a new RequestId.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a RequestId.
                     * @implements IRequestId
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestId=} [properties] Properties to set
                     */
                    function RequestId(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestId Value.
                     * @member {Jde.ApplicationServer.Web.FromClient.ERequest} Value
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @instance
                     */
                    RequestId.prototype.Value = 0;

                    /**
                     * RequestId InstanceId.
                     * @member {number|Long} InstanceId
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @instance
                     */
                    RequestId.prototype.InstanceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * Creates a new RequestId instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestId=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestId} RequestId instance
                     */
                    RequestId.create = function create(properties) {
                        return new RequestId(properties);
                    };

                    /**
                     * Encodes the specified RequestId message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestId.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestId} message RequestId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestId.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Value);
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.InstanceId);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestId message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestId.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestId} message RequestId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestId.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestId message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestId} RequestId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestId.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.RequestId();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Value = reader.int32();
                                break;
                            case 2:
                                message.InstanceId = reader.uint64();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestId message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestId} RequestId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestId.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestId message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestId.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            switch (message.Value) {
                            default:
                                return "Value: enum value expected";
                            case 0:
                            case -1:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                break;
                            }
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (!$util.isInteger(message.InstanceId) && !(message.InstanceId && $util.isInteger(message.InstanceId.low) && $util.isInteger(message.InstanceId.high)))
                                return "InstanceId: integer|Long expected";
                        return null;
                    };

                    /**
                     * Creates a RequestId message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestId} RequestId
                     */
                    RequestId.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.RequestId)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.RequestId();
                        switch (object.Value) {
                        case "Ping":
                        case 0:
                            message.Value = 0;
                            break;
                        case "Negate":
                        case -1:
                            message.Value = -1;
                            break;
                        case "Statuses":
                        case 1:
                            message.Value = 1;
                            break;
                        case "Power":
                        case 2:
                            message.Value = 2;
                            break;
                        case "Logs":
                        case 3:
                            message.Value = 3;
                            break;
                        case "Applications":
                        case 4:
                            message.Value = 4;
                            break;
                        }
                        if (object.InstanceId != null)
                            if ($util.Long)
                                (message.InstanceId = $util.Long.fromValue(object.InstanceId)).unsigned = true;
                            else if (typeof object.InstanceId === "string")
                                message.InstanceId = parseInt(object.InstanceId, 10);
                            else if (typeof object.InstanceId === "number")
                                message.InstanceId = object.InstanceId;
                            else if (typeof object.InstanceId === "object")
                                message.InstanceId = new $util.LongBits(object.InstanceId.low >>> 0, object.InstanceId.high >>> 0).toNumber(true);
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestId message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.RequestId} message RequestId
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestId.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.Value = options.enums === String ? "Ping" : 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.InstanceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.InstanceId = options.longs === String ? "0" : 0;
                        }
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = options.enums === String ? $root.Jde.ApplicationServer.Web.FromClient.ERequest[message.Value] : message.Value;
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (typeof message.InstanceId === "number")
                                object.InstanceId = options.longs === String ? String(message.InstanceId) : message.InstanceId;
                            else
                                object.InstanceId = options.longs === String ? $util.Long.prototype.toString.call(message.InstanceId) : options.longs === Number ? new $util.LongBits(message.InstanceId.low >>> 0, message.InstanceId.high >>> 0).toNumber(true) : message.InstanceId;
                        return object;
                    };

                    /**
                     * Converts this RequestId to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestId
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestId.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestId;
                })();

                FromClient.RequestLogs = (function() {

                    /**
                     * Properties of a RequestLogs.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IRequestLogs
                     * @property {number|Long|null} [ApplicationId] RequestLogs ApplicationId
                     * @property {number|Long|null} [InstanceId] RequestLogs InstanceId
                     * @property {number|null} [Value] RequestLogs Value
                     * @property {number|null} [Start] RequestLogs Start
                     * @property {number|null} [Limit] RequestLogs Limit
                     */

                    /**
                     * Constructs a new RequestLogs.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a RequestLogs.
                     * @implements IRequestLogs
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestLogs=} [properties] Properties to set
                     */
                    function RequestLogs(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestLogs ApplicationId.
                     * @member {number|Long} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     */
                    RequestLogs.prototype.ApplicationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * RequestLogs InstanceId.
                     * @member {number|Long} InstanceId
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     */
                    RequestLogs.prototype.InstanceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * RequestLogs Value.
                     * @member {number} Value
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     */
                    RequestLogs.prototype.Value = 0;

                    /**
                     * RequestLogs Start.
                     * @member {number} Start
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     */
                    RequestLogs.prototype.Start = 0;

                    /**
                     * RequestLogs Limit.
                     * @member {number} Limit
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     */
                    RequestLogs.prototype.Limit = 0;

                    /**
                     * Creates a new RequestLogs instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestLogs=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestLogs} RequestLogs instance
                     */
                    RequestLogs.create = function create(properties) {
                        return new RequestLogs(properties);
                    };

                    /**
                     * Encodes the specified RequestLogs message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestLogs.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestLogs} message RequestLogs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestLogs.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ApplicationId);
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.InstanceId);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Value);
                        if (message.Start != null && message.hasOwnProperty("Start"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.Start);
                        if (message.Limit != null && message.hasOwnProperty("Limit"))
                            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.Limit);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestLogs message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestLogs.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestLogs} message RequestLogs message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestLogs.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestLogs message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestLogs} RequestLogs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestLogs.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.RequestLogs();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.ApplicationId = reader.uint64();
                                break;
                            case 2:
                                message.InstanceId = reader.uint64();
                                break;
                            case 3:
                                message.Value = reader.uint32();
                                break;
                            case 4:
                                message.Start = reader.uint32();
                                break;
                            case 5:
                                message.Limit = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestLogs message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestLogs} RequestLogs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestLogs.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestLogs message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestLogs.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId) && !(message.ApplicationId && $util.isInteger(message.ApplicationId.low) && $util.isInteger(message.ApplicationId.high)))
                                return "ApplicationId: integer|Long expected";
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (!$util.isInteger(message.InstanceId) && !(message.InstanceId && $util.isInteger(message.InstanceId.low) && $util.isInteger(message.InstanceId.high)))
                                return "InstanceId: integer|Long expected";
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isInteger(message.Value))
                                return "Value: integer expected";
                        if (message.Start != null && message.hasOwnProperty("Start"))
                            if (!$util.isInteger(message.Start))
                                return "Start: integer expected";
                        if (message.Limit != null && message.hasOwnProperty("Limit"))
                            if (!$util.isInteger(message.Limit))
                                return "Limit: integer expected";
                        return null;
                    };

                    /**
                     * Creates a RequestLogs message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestLogs} RequestLogs
                     */
                    RequestLogs.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.RequestLogs)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.RequestLogs();
                        if (object.ApplicationId != null)
                            if ($util.Long)
                                (message.ApplicationId = $util.Long.fromValue(object.ApplicationId)).unsigned = true;
                            else if (typeof object.ApplicationId === "string")
                                message.ApplicationId = parseInt(object.ApplicationId, 10);
                            else if (typeof object.ApplicationId === "number")
                                message.ApplicationId = object.ApplicationId;
                            else if (typeof object.ApplicationId === "object")
                                message.ApplicationId = new $util.LongBits(object.ApplicationId.low >>> 0, object.ApplicationId.high >>> 0).toNumber(true);
                        if (object.InstanceId != null)
                            if ($util.Long)
                                (message.InstanceId = $util.Long.fromValue(object.InstanceId)).unsigned = true;
                            else if (typeof object.InstanceId === "string")
                                message.InstanceId = parseInt(object.InstanceId, 10);
                            else if (typeof object.InstanceId === "number")
                                message.InstanceId = object.InstanceId;
                            else if (typeof object.InstanceId === "object")
                                message.InstanceId = new $util.LongBits(object.InstanceId.low >>> 0, object.InstanceId.high >>> 0).toNumber(true);
                        if (object.Value != null)
                            message.Value = object.Value >>> 0;
                        if (object.Start != null)
                            message.Start = object.Start >>> 0;
                        if (object.Limit != null)
                            message.Limit = object.Limit >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestLogs message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.RequestLogs} message RequestLogs
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestLogs.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.ApplicationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.ApplicationId = options.longs === String ? "0" : 0;
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.InstanceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.InstanceId = options.longs === String ? "0" : 0;
                            object.Value = 0;
                            object.Start = 0;
                            object.Limit = 0;
                        }
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (typeof message.ApplicationId === "number")
                                object.ApplicationId = options.longs === String ? String(message.ApplicationId) : message.ApplicationId;
                            else
                                object.ApplicationId = options.longs === String ? $util.Long.prototype.toString.call(message.ApplicationId) : options.longs === Number ? new $util.LongBits(message.ApplicationId.low >>> 0, message.ApplicationId.high >>> 0).toNumber(true) : message.ApplicationId;
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (typeof message.InstanceId === "number")
                                object.InstanceId = options.longs === String ? String(message.InstanceId) : message.InstanceId;
                            else
                                object.InstanceId = options.longs === String ? $util.Long.prototype.toString.call(message.InstanceId) : options.longs === Number ? new $util.LongBits(message.InstanceId.low >>> 0, message.InstanceId.high >>> 0).toNumber(true) : message.InstanceId;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        if (message.Start != null && message.hasOwnProperty("Start"))
                            object.Start = message.Start;
                        if (message.Limit != null && message.hasOwnProperty("Limit"))
                            object.Limit = message.Limit;
                        return object;
                    };

                    /**
                     * Converts this RequestLogs to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestLogs
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestLogs.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestLogs;
                })();

                FromClient.LogValues = (function() {

                    /**
                     * Properties of a LogValues.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface ILogValues
                     * @property {number|Long|null} [InstanceId] LogValues InstanceId
                     * @property {number|null} [DbValue] LogValues DbValue
                     * @property {number|null} [ClientValue] LogValues ClientValue
                     */

                    /**
                     * Constructs a new LogValues.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a LogValues.
                     * @implements ILogValues
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.ILogValues=} [properties] Properties to set
                     */
                    function LogValues(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * LogValues InstanceId.
                     * @member {number|Long} InstanceId
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @instance
                     */
                    LogValues.prototype.InstanceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                    /**
                     * LogValues DbValue.
                     * @member {number} DbValue
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @instance
                     */
                    LogValues.prototype.DbValue = 0;

                    /**
                     * LogValues ClientValue.
                     * @member {number} ClientValue
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @instance
                     */
                    LogValues.prototype.ClientValue = 0;

                    /**
                     * Creates a new LogValues instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ILogValues=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.LogValues} LogValues instance
                     */
                    LogValues.create = function create(properties) {
                        return new LogValues(properties);
                    };

                    /**
                     * Encodes the specified LogValues message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.LogValues.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ILogValues} message LogValues message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LogValues.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.InstanceId);
                        if (message.DbValue != null && message.hasOwnProperty("DbValue"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.DbValue);
                        if (message.ClientValue != null && message.hasOwnProperty("ClientValue"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.ClientValue);
                        return writer;
                    };

                    /**
                     * Encodes the specified LogValues message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.LogValues.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ILogValues} message LogValues message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LogValues.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a LogValues message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.LogValues} LogValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LogValues.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.LogValues();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.InstanceId = reader.uint64();
                                break;
                            case 2:
                                message.DbValue = reader.uint32();
                                break;
                            case 3:
                                message.ClientValue = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a LogValues message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.LogValues} LogValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LogValues.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a LogValues message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LogValues.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (!$util.isInteger(message.InstanceId) && !(message.InstanceId && $util.isInteger(message.InstanceId.low) && $util.isInteger(message.InstanceId.high)))
                                return "InstanceId: integer|Long expected";
                        if (message.DbValue != null && message.hasOwnProperty("DbValue"))
                            if (!$util.isInteger(message.DbValue))
                                return "DbValue: integer expected";
                        if (message.ClientValue != null && message.hasOwnProperty("ClientValue"))
                            if (!$util.isInteger(message.ClientValue))
                                return "ClientValue: integer expected";
                        return null;
                    };

                    /**
                     * Creates a LogValues message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.LogValues} LogValues
                     */
                    LogValues.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.LogValues)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.LogValues();
                        if (object.InstanceId != null)
                            if ($util.Long)
                                (message.InstanceId = $util.Long.fromValue(object.InstanceId)).unsigned = true;
                            else if (typeof object.InstanceId === "string")
                                message.InstanceId = parseInt(object.InstanceId, 10);
                            else if (typeof object.InstanceId === "number")
                                message.InstanceId = object.InstanceId;
                            else if (typeof object.InstanceId === "object")
                                message.InstanceId = new $util.LongBits(object.InstanceId.low >>> 0, object.InstanceId.high >>> 0).toNumber(true);
                        if (object.DbValue != null)
                            message.DbValue = object.DbValue >>> 0;
                        if (object.ClientValue != null)
                            message.ClientValue = object.ClientValue >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a LogValues message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.LogValues} message LogValues
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LogValues.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            if ($util.Long) {
                                let long = new $util.Long(0, 0, true);
                                object.InstanceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                            } else
                                object.InstanceId = options.longs === String ? "0" : 0;
                            object.DbValue = 0;
                            object.ClientValue = 0;
                        }
                        if (message.InstanceId != null && message.hasOwnProperty("InstanceId"))
                            if (typeof message.InstanceId === "number")
                                object.InstanceId = options.longs === String ? String(message.InstanceId) : message.InstanceId;
                            else
                                object.InstanceId = options.longs === String ? $util.Long.prototype.toString.call(message.InstanceId) : options.longs === Number ? new $util.LongBits(message.InstanceId.low >>> 0, message.InstanceId.high >>> 0).toNumber(true) : message.InstanceId;
                        if (message.DbValue != null && message.hasOwnProperty("DbValue"))
                            object.DbValue = message.DbValue;
                        if (message.ClientValue != null && message.hasOwnProperty("ClientValue"))
                            object.ClientValue = message.ClientValue;
                        return object;
                    };

                    /**
                     * Converts this LogValues to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.LogValues
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LogValues.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return LogValues;
                })();

                /**
                 * EStringRequest enum.
                 * @name Jde.ApplicationServer.Web.FromClient.EStringRequest
                 * @enum {string}
                 * @property {number} MessageString=0 MessageString value
                 * @property {number} File=1 File value
                 * @property {number} Function=2 Function value
                 * @property {number} Thread=3 Thread value
                 * @property {number} User=4 User value
                 */
                FromClient.EStringRequest = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "MessageString"] = 0;
                    values[valuesById[1] = "File"] = 1;
                    values[valuesById[2] = "Function"] = 2;
                    values[valuesById[3] = "Thread"] = 3;
                    values[valuesById[4] = "User"] = 4;
                    return values;
                })();

                FromClient.RequestString = (function() {

                    /**
                     * Properties of a RequestString.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IRequestString
                     * @property {number|null} [ApplicationId] RequestString ApplicationId
                     * @property {Jde.ApplicationServer.Web.FromClient.EStringRequest|null} [Type] RequestString Type
                     * @property {number|null} [Value] RequestString Value
                     */

                    /**
                     * Constructs a new RequestString.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a RequestString.
                     * @implements IRequestString
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestString=} [properties] Properties to set
                     */
                    function RequestString(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestString ApplicationId.
                     * @member {number} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @instance
                     */
                    RequestString.prototype.ApplicationId = 0;

                    /**
                     * RequestString Type.
                     * @member {Jde.ApplicationServer.Web.FromClient.EStringRequest} Type
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @instance
                     */
                    RequestString.prototype.Type = 0;

                    /**
                     * RequestString Value.
                     * @member {number} Value
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @instance
                     */
                    RequestString.prototype.Value = 0;

                    /**
                     * Creates a new RequestString instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestString=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestString} RequestString instance
                     */
                    RequestString.create = function create(properties) {
                        return new RequestString(properties);
                    };

                    /**
                     * Encodes the specified RequestString message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestString.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestString} message RequestString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestString.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ApplicationId);
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.Type);
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.Value);
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestString message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestString.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestString} message RequestString message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestString.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestString message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestString} RequestString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestString.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.RequestString();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.ApplicationId = reader.uint32();
                                break;
                            case 2:
                                message.Type = reader.int32();
                                break;
                            case 3:
                                message.Value = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestString message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestString} RequestString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestString.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestString message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestString.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId))
                                return "ApplicationId: integer expected";
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            switch (message.Type) {
                            default:
                                return "Type: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                break;
                            }
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            if (!$util.isInteger(message.Value))
                                return "Value: integer expected";
                        return null;
                    };

                    /**
                     * Creates a RequestString message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestString} RequestString
                     */
                    RequestString.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.RequestString)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.RequestString();
                        if (object.ApplicationId != null)
                            message.ApplicationId = object.ApplicationId >>> 0;
                        switch (object.Type) {
                        case "MessageString":
                        case 0:
                            message.Type = 0;
                            break;
                        case "File":
                        case 1:
                            message.Type = 1;
                            break;
                        case "Function":
                        case 2:
                            message.Type = 2;
                            break;
                        case "Thread":
                        case 3:
                            message.Type = 3;
                            break;
                        case "User":
                        case 4:
                            message.Type = 4;
                            break;
                        }
                        if (object.Value != null)
                            message.Value = object.Value >>> 0;
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestString message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.RequestString} message RequestString
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestString.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.ApplicationId = 0;
                            object.Type = options.enums === String ? "MessageString" : 0;
                            object.Value = 0;
                        }
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            object.ApplicationId = message.ApplicationId;
                        if (message.Type != null && message.hasOwnProperty("Type"))
                            object.Type = options.enums === String ? $root.Jde.ApplicationServer.Web.FromClient.EStringRequest[message.Type] : message.Type;
                        if (message.Value != null && message.hasOwnProperty("Value"))
                            object.Value = message.Value;
                        return object;
                    };

                    /**
                     * Converts this RequestString to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestString
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestString.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestString;
                })();

                FromClient.RequestStrings = (function() {

                    /**
                     * Properties of a RequestStrings.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IRequestStrings
                     * @property {number|null} [RequestId] RequestStrings RequestId
                     * @property {Array.<Jde.ApplicationServer.Web.FromClient.IRequestString>|null} [Values] RequestStrings Values
                     */

                    /**
                     * Constructs a new RequestStrings.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a RequestStrings.
                     * @implements IRequestStrings
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestStrings=} [properties] Properties to set
                     */
                    function RequestStrings(properties) {
                        this.Values = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * RequestStrings RequestId.
                     * @member {number} RequestId
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @instance
                     */
                    RequestStrings.prototype.RequestId = 0;

                    /**
                     * RequestStrings Values.
                     * @member {Array.<Jde.ApplicationServer.Web.FromClient.IRequestString>} Values
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @instance
                     */
                    RequestStrings.prototype.Values = $util.emptyArray;

                    /**
                     * Creates a new RequestStrings instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestStrings=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestStrings} RequestStrings instance
                     */
                    RequestStrings.create = function create(properties) {
                        return new RequestStrings(properties);
                    };

                    /**
                     * Encodes the specified RequestStrings message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestStrings.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestStrings} message RequestStrings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestStrings.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.Values != null && message.Values.length)
                            for (let i = 0; i < message.Values.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromClient.RequestString.encode(message.Values[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified RequestStrings message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestStrings.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IRequestStrings} message RequestStrings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RequestStrings.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a RequestStrings message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestStrings} RequestStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestStrings.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.RequestStrings();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.RequestId = reader.uint32();
                                break;
                            case 2:
                                if (!(message.Values && message.Values.length))
                                    message.Values = [];
                                message.Values.push($root.Jde.ApplicationServer.Web.FromClient.RequestString.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a RequestStrings message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestStrings} RequestStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RequestStrings.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a RequestStrings message.
                     * @function verify
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RequestStrings.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            if (!$util.isInteger(message.RequestId))
                                return "RequestId: integer expected";
                        if (message.Values != null && message.hasOwnProperty("Values")) {
                            if (!Array.isArray(message.Values))
                                return "Values: array expected";
                            for (let i = 0; i < message.Values.length; ++i) {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.RequestString.verify(message.Values[i]);
                                if (error)
                                    return "Values." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a RequestStrings message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.RequestStrings} RequestStrings
                     */
                    RequestStrings.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.RequestStrings)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.RequestStrings();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.Values) {
                            if (!Array.isArray(object.Values))
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.RequestStrings.Values: array expected");
                            message.Values = [];
                            for (let i = 0; i < object.Values.length; ++i) {
                                if (typeof object.Values[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromClient.RequestStrings.Values: object expected");
                                message.Values[i] = $root.Jde.ApplicationServer.Web.FromClient.RequestString.fromObject(object.Values[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a RequestStrings message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.RequestStrings} message RequestStrings
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RequestStrings.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.Values = [];
                        if (options.defaults)
                            object.RequestId = 0;
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            object.RequestId = message.RequestId;
                        if (message.Values && message.Values.length) {
                            object.Values = [];
                            for (let j = 0; j < message.Values.length; ++j)
                                object.Values[j] = $root.Jde.ApplicationServer.Web.FromClient.RequestString.toObject(message.Values[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this RequestStrings to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.RequestStrings
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RequestStrings.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return RequestStrings;
                })();

                FromClient.Custom = (function() {

                    /**
                     * Properties of a Custom.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface ICustom
                     * @property {number|null} [RequestId] Custom RequestId
                     * @property {number|null} [ApplicationId] Custom ApplicationId
                     * @property {Uint8Array|null} [Message] Custom Message
                     */

                    /**
                     * Constructs a new Custom.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a Custom.
                     * @implements ICustom
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.ICustom=} [properties] Properties to set
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @instance
                     */
                    Custom.prototype.RequestId = 0;

                    /**
                     * Custom ApplicationId.
                     * @member {number} ApplicationId
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @instance
                     */
                    Custom.prototype.ApplicationId = 0;

                    /**
                     * Custom Message.
                     * @member {Uint8Array} Message
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @instance
                     */
                    Custom.prototype.Message = $util.newBuffer([]);

                    /**
                     * Creates a new Custom instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ICustom=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.Custom} Custom instance
                     */
                    Custom.create = function create(properties) {
                        return new Custom(properties);
                    };

                    /**
                     * Encodes the specified Custom message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Custom.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ICustom} message Custom message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Custom.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.RequestId);
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.ApplicationId);
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.Message);
                        return writer;
                    };

                    /**
                     * Encodes the specified Custom message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Custom.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ICustom} message Custom message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Custom.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Custom message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.Custom} Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Custom.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.Custom();
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.Custom} Custom
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
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
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            if (!$util.isInteger(message.ApplicationId))
                                return "ApplicationId: integer expected";
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            if (!(message.Message && typeof message.Message.length === "number" || $util.isString(message.Message)))
                                return "Message: buffer expected";
                        return null;
                    };

                    /**
                     * Creates a Custom message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.Custom} Custom
                     */
                    Custom.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.Custom)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.Custom();
                        if (object.RequestId != null)
                            message.RequestId = object.RequestId >>> 0;
                        if (object.ApplicationId != null)
                            message.ApplicationId = object.ApplicationId >>> 0;
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.Custom} message Custom
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Custom.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.defaults) {
                            object.RequestId = 0;
                            object.ApplicationId = 0;
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
                        if (message.ApplicationId != null && message.hasOwnProperty("ApplicationId"))
                            object.ApplicationId = message.ApplicationId;
                        if (message.Message != null && message.hasOwnProperty("Message"))
                            object.Message = options.bytes === String ? $util.base64.encode(message.Message, 0, message.Message.length) : options.bytes === Array ? Array.prototype.slice.call(message.Message) : message.Message;
                        return object;
                    };

                    /**
                     * Converts this Custom to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.Custom
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Custom.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Custom;
                })();

                FromClient.MessageUnion = (function() {

                    /**
                     * Properties of a MessageUnion.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface IMessageUnion
                     * @property {Jde.ApplicationServer.Web.FromClient.IRequest|null} [Request] MessageUnion Request
                     * @property {Jde.ApplicationServer.Web.FromClient.IRequestId|null} [RequestId] MessageUnion RequestId
                     * @property {Jde.ApplicationServer.Web.FromClient.IRequestLogs|null} [RequestLogs] MessageUnion RequestLogs
                     * @property {Jde.ApplicationServer.Web.FromClient.ILogValues|null} [LogValues] MessageUnion LogValues
                     * @property {Jde.ApplicationServer.Web.FromClient.IRequestStrings|null} [RequestStrings] MessageUnion RequestStrings
                     * @property {Jde.ApplicationServer.Web.FromClient.ICustom|null} [Custom] MessageUnion Custom
                     */

                    /**
                     * Constructs a new MessageUnion.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a MessageUnion.
                     * @implements IMessageUnion
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.IMessageUnion=} [properties] Properties to set
                     */
                    function MessageUnion(properties) {
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * MessageUnion Request.
                     * @member {Jde.ApplicationServer.Web.FromClient.IRequest|null|undefined} Request
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Request = null;

                    /**
                     * MessageUnion RequestId.
                     * @member {Jde.ApplicationServer.Web.FromClient.IRequestId|null|undefined} RequestId
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.RequestId = null;

                    /**
                     * MessageUnion RequestLogs.
                     * @member {Jde.ApplicationServer.Web.FromClient.IRequestLogs|null|undefined} RequestLogs
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.RequestLogs = null;

                    /**
                     * MessageUnion LogValues.
                     * @member {Jde.ApplicationServer.Web.FromClient.ILogValues|null|undefined} LogValues
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.LogValues = null;

                    /**
                     * MessageUnion RequestStrings.
                     * @member {Jde.ApplicationServer.Web.FromClient.IRequestStrings|null|undefined} RequestStrings
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.RequestStrings = null;

                    /**
                     * MessageUnion Custom.
                     * @member {Jde.ApplicationServer.Web.FromClient.ICustom|null|undefined} Custom
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    MessageUnion.prototype.Custom = null;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    /**
                     * MessageUnion Value.
                     * @member {"Request"|"RequestId"|"RequestLogs"|"LogValues"|"RequestStrings"|"Custom"|undefined} Value
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     */
                    Object.defineProperty(MessageUnion.prototype, "Value", {
                        get: $util.oneOfGetter($oneOfFields = ["Request", "RequestId", "RequestLogs", "LogValues", "RequestStrings", "Custom"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IMessageUnion=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.MessageUnion} MessageUnion instance
                     */
                    MessageUnion.create = function create(properties) {
                        return new MessageUnion(properties);
                    };

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.MessageUnion.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Request != null && message.hasOwnProperty("Request"))
                            $root.Jde.ApplicationServer.Web.FromClient.Request.encode(message.Request, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.RequestId != null && message.hasOwnProperty("RequestId"))
                            $root.Jde.ApplicationServer.Web.FromClient.RequestId.encode(message.RequestId, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.RequestLogs != null && message.hasOwnProperty("RequestLogs"))
                            $root.Jde.ApplicationServer.Web.FromClient.RequestLogs.encode(message.RequestLogs, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.LogValues != null && message.hasOwnProperty("LogValues"))
                            $root.Jde.ApplicationServer.Web.FromClient.LogValues.encode(message.LogValues, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.RequestStrings != null && message.hasOwnProperty("RequestStrings"))
                            $root.Jde.ApplicationServer.Web.FromClient.RequestStrings.encode(message.RequestStrings, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.Custom != null && message.hasOwnProperty("Custom"))
                            $root.Jde.ApplicationServer.Web.FromClient.Custom.encode(message.Custom, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.MessageUnion.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.IMessageUnion} message MessageUnion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MessageUnion.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.MessageUnion} MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MessageUnion.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.MessageUnion();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.Request = $root.Jde.ApplicationServer.Web.FromClient.Request.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.RequestId = $root.Jde.ApplicationServer.Web.FromClient.RequestId.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.RequestLogs = $root.Jde.ApplicationServer.Web.FromClient.RequestLogs.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.LogValues = $root.Jde.ApplicationServer.Web.FromClient.LogValues.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.RequestStrings = $root.Jde.ApplicationServer.Web.FromClient.RequestStrings.decode(reader, reader.uint32());
                                break;
                            case 7:
                                message.Custom = $root.Jde.ApplicationServer.Web.FromClient.Custom.decode(reader, reader.uint32());
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.MessageUnion} MessageUnion
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MessageUnion.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        let properties = {};
                        if (message.Request != null && message.hasOwnProperty("Request")) {
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.Request.verify(message.Request);
                                if (error)
                                    return "Request." + error;
                            }
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.RequestId.verify(message.RequestId);
                                if (error)
                                    return "RequestId." + error;
                            }
                        }
                        if (message.RequestLogs != null && message.hasOwnProperty("RequestLogs")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.RequestLogs.verify(message.RequestLogs);
                                if (error)
                                    return "RequestLogs." + error;
                            }
                        }
                        if (message.LogValues != null && message.hasOwnProperty("LogValues")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.LogValues.verify(message.LogValues);
                                if (error)
                                    return "LogValues." + error;
                            }
                        }
                        if (message.RequestStrings != null && message.hasOwnProperty("RequestStrings")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.RequestStrings.verify(message.RequestStrings);
                                if (error)
                                    return "RequestStrings." + error;
                            }
                        }
                        if (message.Custom != null && message.hasOwnProperty("Custom")) {
                            if (properties.Value === 1)
                                return "Value: multiple values";
                            properties.Value = 1;
                            {
                                let error = $root.Jde.ApplicationServer.Web.FromClient.Custom.verify(message.Custom);
                                if (error)
                                    return "Custom." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a MessageUnion message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.MessageUnion} MessageUnion
                     */
                    MessageUnion.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.MessageUnion)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.MessageUnion();
                        if (object.Request != null) {
                            if (typeof object.Request !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.Request: object expected");
                            message.Request = $root.Jde.ApplicationServer.Web.FromClient.Request.fromObject(object.Request);
                        }
                        if (object.RequestId != null) {
                            if (typeof object.RequestId !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.RequestId: object expected");
                            message.RequestId = $root.Jde.ApplicationServer.Web.FromClient.RequestId.fromObject(object.RequestId);
                        }
                        if (object.RequestLogs != null) {
                            if (typeof object.RequestLogs !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.RequestLogs: object expected");
                            message.RequestLogs = $root.Jde.ApplicationServer.Web.FromClient.RequestLogs.fromObject(object.RequestLogs);
                        }
                        if (object.LogValues != null) {
                            if (typeof object.LogValues !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.LogValues: object expected");
                            message.LogValues = $root.Jde.ApplicationServer.Web.FromClient.LogValues.fromObject(object.LogValues);
                        }
                        if (object.RequestStrings != null) {
                            if (typeof object.RequestStrings !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.RequestStrings: object expected");
                            message.RequestStrings = $root.Jde.ApplicationServer.Web.FromClient.RequestStrings.fromObject(object.RequestStrings);
                        }
                        if (object.Custom != null) {
                            if (typeof object.Custom !== "object")
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.MessageUnion.Custom: object expected");
                            message.Custom = $root.Jde.ApplicationServer.Web.FromClient.Custom.fromObject(object.Custom);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.MessageUnion} message MessageUnion
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MessageUnion.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (message.Request != null && message.hasOwnProperty("Request")) {
                            object.Request = $root.Jde.ApplicationServer.Web.FromClient.Request.toObject(message.Request, options);
                            if (options.oneofs)
                                object.Value = "Request";
                        }
                        if (message.RequestId != null && message.hasOwnProperty("RequestId")) {
                            object.RequestId = $root.Jde.ApplicationServer.Web.FromClient.RequestId.toObject(message.RequestId, options);
                            if (options.oneofs)
                                object.Value = "RequestId";
                        }
                        if (message.RequestLogs != null && message.hasOwnProperty("RequestLogs")) {
                            object.RequestLogs = $root.Jde.ApplicationServer.Web.FromClient.RequestLogs.toObject(message.RequestLogs, options);
                            if (options.oneofs)
                                object.Value = "RequestLogs";
                        }
                        if (message.LogValues != null && message.hasOwnProperty("LogValues")) {
                            object.LogValues = $root.Jde.ApplicationServer.Web.FromClient.LogValues.toObject(message.LogValues, options);
                            if (options.oneofs)
                                object.Value = "LogValues";
                        }
                        if (message.RequestStrings != null && message.hasOwnProperty("RequestStrings")) {
                            object.RequestStrings = $root.Jde.ApplicationServer.Web.FromClient.RequestStrings.toObject(message.RequestStrings, options);
                            if (options.oneofs)
                                object.Value = "RequestStrings";
                        }
                        if (message.Custom != null && message.hasOwnProperty("Custom")) {
                            object.Custom = $root.Jde.ApplicationServer.Web.FromClient.Custom.toObject(message.Custom, options);
                            if (options.oneofs)
                                object.Value = "Custom";
                        }
                        return object;
                    };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.MessageUnion
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MessageUnion.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return MessageUnion;
                })();

                FromClient.Transmission = (function() {

                    /**
                     * Properties of a Transmission.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @interface ITransmission
                     * @property {Array.<Jde.ApplicationServer.Web.FromClient.IMessageUnion>|null} [Messages] Transmission Messages
                     */

                    /**
                     * Constructs a new Transmission.
                     * @memberof Jde.ApplicationServer.Web.FromClient
                     * @classdesc Represents a Transmission.
                     * @implements ITransmission
                     * @constructor
                     * @param {Jde.ApplicationServer.Web.FromClient.ITransmission=} [properties] Properties to set
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
                     * @member {Array.<Jde.ApplicationServer.Web.FromClient.IMessageUnion>} Messages
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @instance
                     */
                    Transmission.prototype.Messages = $util.emptyArray;

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @function create
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ITransmission=} [properties] Properties to set
                     * @returns {Jde.ApplicationServer.Web.FromClient.Transmission} Transmission instance
                     */
                    Transmission.create = function create(properties) {
                        return new Transmission(properties);
                    };

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Transmission.verify|verify} messages.
                     * @function encode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.Messages != null && message.Messages.length)
                            for (let i = 0; i < message.Messages.length; ++i)
                                $root.Jde.ApplicationServer.Web.FromClient.MessageUnion.encode(message.Messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Transmission.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.ITransmission} message Transmission message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Transmission.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @function decode
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {Jde.ApplicationServer.Web.FromClient.Transmission} Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Transmission.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Jde.ApplicationServer.Web.FromClient.Transmission();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.Messages && message.Messages.length))
                                    message.Messages = [];
                                message.Messages.push($root.Jde.ApplicationServer.Web.FromClient.MessageUnion.decode(reader, reader.uint32()));
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {Jde.ApplicationServer.Web.FromClient.Transmission} Transmission
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
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
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
                                let error = $root.Jde.ApplicationServer.Web.FromClient.MessageUnion.verify(message.Messages[i]);
                                if (error)
                                    return "Messages." + error;
                            }
                        }
                        return null;
                    };

                    /**
                     * Creates a Transmission message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {Jde.ApplicationServer.Web.FromClient.Transmission} Transmission
                     */
                    Transmission.fromObject = function fromObject(object) {
                        if (object instanceof $root.Jde.ApplicationServer.Web.FromClient.Transmission)
                            return object;
                        let message = new $root.Jde.ApplicationServer.Web.FromClient.Transmission();
                        if (object.Messages) {
                            if (!Array.isArray(object.Messages))
                                throw TypeError(".Jde.ApplicationServer.Web.FromClient.Transmission.Messages: array expected");
                            message.Messages = [];
                            for (let i = 0; i < object.Messages.length; ++i) {
                                if (typeof object.Messages[i] !== "object")
                                    throw TypeError(".Jde.ApplicationServer.Web.FromClient.Transmission.Messages: object expected");
                                message.Messages[i] = $root.Jde.ApplicationServer.Web.FromClient.MessageUnion.fromObject(object.Messages[i]);
                            }
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @static
                     * @param {Jde.ApplicationServer.Web.FromClient.Transmission} message Transmission
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
                                object.Messages[j] = $root.Jde.ApplicationServer.Web.FromClient.MessageUnion.toObject(message.Messages[j], options);
                        }
                        return object;
                    };

                    /**
                     * Converts this Transmission to JSON.
                     * @function toJSON
                     * @memberof Jde.ApplicationServer.Web.FromClient.Transmission
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Transmission.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    return Transmission;
                })();

                return FromClient;
            })();

            return Web;
        })();

        return ApplicationServer;
    })();

    return Jde;
})();

export { $root as default };
