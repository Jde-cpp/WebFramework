import * as $protobuf from "protobufjs";
/** Namespace Jde. */
export namespace Jde {

    /** Namespace ApplicationServer. */
    namespace ApplicationServer {

        /** Namespace Web. */
        namespace Web {

            /** Namespace FromClient. */
            namespace FromClient {

                /** ERequest enum. */
                enum ERequest {
                    Ping = 0,
                    Negate = -1,
                    Statuses = 1,
                    Power = 2,
                    Logs = 3,
                    Applications = 4
                }

                /** Properties of a Request. */
                interface IRequest {

                    /** Request Value */
                    Value?: (Jde.ApplicationServer.Web.FromClient.ERequest|null);
                }

                /** Represents a Request. */
                class Request implements IRequest {

                    /**
                     * Constructs a new Request.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IRequest);

                    /** Request Value. */
                    public Value: Jde.ApplicationServer.Web.FromClient.ERequest;

                    /**
                     * Creates a new Request instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Request instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IRequest): Jde.ApplicationServer.Web.FromClient.Request;

                    /**
                     * Encodes the specified Request message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Request.verify|verify} messages.
                     * @param message Request message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Request message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Request.verify|verify} messages.
                     * @param message Request message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Request message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.Request;

                    /**
                     * Decodes a Request message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.Request;

                    /**
                     * Verifies a Request message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Request message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Request
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.Request;

                    /**
                     * Creates a plain object from a Request message. Also converts values to other types if specified.
                     * @param message Request
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Request to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestId. */
                interface IRequestId {

                    /** RequestId Value */
                    Value?: (Jde.ApplicationServer.Web.FromClient.ERequest|null);

                    /** RequestId InstanceId */
                    InstanceId?: (number|Long|null);
                }

                /** Represents a RequestId. */
                class RequestId implements IRequestId {

                    /**
                     * Constructs a new RequestId.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IRequestId);

                    /** RequestId Value. */
                    public Value: Jde.ApplicationServer.Web.FromClient.ERequest;

                    /** RequestId InstanceId. */
                    public InstanceId: (number|Long);

                    /**
                     * Creates a new RequestId instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestId instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IRequestId): Jde.ApplicationServer.Web.FromClient.RequestId;

                    /**
                     * Encodes the specified RequestId message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestId.verify|verify} messages.
                     * @param message RequestId message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IRequestId, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestId message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestId.verify|verify} messages.
                     * @param message RequestId message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IRequestId, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestId message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.RequestId;

                    /**
                     * Decodes a RequestId message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.RequestId;

                    /**
                     * Verifies a RequestId message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestId message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestId
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.RequestId;

                    /**
                     * Creates a plain object from a RequestId message. Also converts values to other types if specified.
                     * @param message RequestId
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.RequestId, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestId to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestLogs. */
                interface IRequestLogs {

                    /** RequestLogs ApplicationId */
                    ApplicationId?: (number|Long|null);

                    /** RequestLogs InstanceId */
                    InstanceId?: (number|Long|null);

                    /** RequestLogs Value */
                    Value?: (number|null);

                    /** RequestLogs Start */
                    Start?: (number|null);
                }

                /** Represents a RequestLogs. */
                class RequestLogs implements IRequestLogs {

                    /**
                     * Constructs a new RequestLogs.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IRequestLogs);

                    /** RequestLogs ApplicationId. */
                    public ApplicationId: (number|Long);

                    /** RequestLogs InstanceId. */
                    public InstanceId: (number|Long);

                    /** RequestLogs Value. */
                    public Value: number;

                    /** RequestLogs Start. */
                    public Start: number;

                    /**
                     * Creates a new RequestLogs instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestLogs instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IRequestLogs): Jde.ApplicationServer.Web.FromClient.RequestLogs;

                    /**
                     * Encodes the specified RequestLogs message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestLogs.verify|verify} messages.
                     * @param message RequestLogs message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IRequestLogs, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestLogs message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestLogs.verify|verify} messages.
                     * @param message RequestLogs message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IRequestLogs, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestLogs message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestLogs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.RequestLogs;

                    /**
                     * Decodes a RequestLogs message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestLogs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.RequestLogs;

                    /**
                     * Verifies a RequestLogs message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestLogs message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestLogs
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.RequestLogs;

                    /**
                     * Creates a plain object from a RequestLogs message. Also converts values to other types if specified.
                     * @param message RequestLogs
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.RequestLogs, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestLogs to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a LogValues. */
                interface ILogValues {

                    /** LogValues InstanceId */
                    InstanceId?: (number|Long|null);

                    /** LogValues DbValue */
                    DbValue?: (number|null);

                    /** LogValues ClientValue */
                    ClientValue?: (number|null);
                }

                /** Represents a LogValues. */
                class LogValues implements ILogValues {

                    /**
                     * Constructs a new LogValues.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.ILogValues);

                    /** LogValues InstanceId. */
                    public InstanceId: (number|Long);

                    /** LogValues DbValue. */
                    public DbValue: number;

                    /** LogValues ClientValue. */
                    public ClientValue: number;

                    /**
                     * Creates a new LogValues instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns LogValues instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.ILogValues): Jde.ApplicationServer.Web.FromClient.LogValues;

                    /**
                     * Encodes the specified LogValues message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.LogValues.verify|verify} messages.
                     * @param message LogValues message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.ILogValues, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified LogValues message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.LogValues.verify|verify} messages.
                     * @param message LogValues message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.ILogValues, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a LogValues message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns LogValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.LogValues;

                    /**
                     * Decodes a LogValues message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns LogValues
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.LogValues;

                    /**
                     * Verifies a LogValues message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a LogValues message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns LogValues
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.LogValues;

                    /**
                     * Creates a plain object from a LogValues message. Also converts values to other types if specified.
                     * @param message LogValues
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.LogValues, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this LogValues to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** EStringRequest enum. */
                enum EStringRequest {
                    MessageString = 0,
                    File = 1,
                    Function = 2,
                    Thread = 3,
                    User = 4
                }

                /** Properties of a RequestString. */
                interface IRequestString {

                    /** RequestString ApplicationId */
                    ApplicationId?: (number|null);

                    /** RequestString Type */
                    Type?: (Jde.ApplicationServer.Web.FromClient.EStringRequest|null);

                    /** RequestString Value */
                    Value?: (number|null);
                }

                /** Represents a RequestString. */
                class RequestString implements IRequestString {

                    /**
                     * Constructs a new RequestString.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IRequestString);

                    /** RequestString ApplicationId. */
                    public ApplicationId: number;

                    /** RequestString Type. */
                    public Type: Jde.ApplicationServer.Web.FromClient.EStringRequest;

                    /** RequestString Value. */
                    public Value: number;

                    /**
                     * Creates a new RequestString instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestString instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IRequestString): Jde.ApplicationServer.Web.FromClient.RequestString;

                    /**
                     * Encodes the specified RequestString message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestString.verify|verify} messages.
                     * @param message RequestString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IRequestString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestString message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestString.verify|verify} messages.
                     * @param message RequestString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IRequestString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestString message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.RequestString;

                    /**
                     * Decodes a RequestString message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.RequestString;

                    /**
                     * Verifies a RequestString message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestString message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestString
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.RequestString;

                    /**
                     * Creates a plain object from a RequestString message. Also converts values to other types if specified.
                     * @param message RequestString
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.RequestString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestString to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a RequestStrings. */
                interface IRequestStrings {

                    /** RequestStrings Values */
                    Values?: (Jde.ApplicationServer.Web.FromClient.IRequestString[]|null);
                }

                /** Represents a RequestStrings. */
                class RequestStrings implements IRequestStrings {

                    /**
                     * Constructs a new RequestStrings.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IRequestStrings);

                    /** RequestStrings Values. */
                    public Values: Jde.ApplicationServer.Web.FromClient.IRequestString[];

                    /**
                     * Creates a new RequestStrings instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RequestStrings instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IRequestStrings): Jde.ApplicationServer.Web.FromClient.RequestStrings;

                    /**
                     * Encodes the specified RequestStrings message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestStrings.verify|verify} messages.
                     * @param message RequestStrings message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IRequestStrings, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified RequestStrings message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.RequestStrings.verify|verify} messages.
                     * @param message RequestStrings message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IRequestStrings, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RequestStrings message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns RequestStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.RequestStrings;

                    /**
                     * Decodes a RequestStrings message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns RequestStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.RequestStrings;

                    /**
                     * Verifies a RequestStrings message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a RequestStrings message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns RequestStrings
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.RequestStrings;

                    /**
                     * Creates a plain object from a RequestStrings message. Also converts values to other types if specified.
                     * @param message RequestStrings
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.RequestStrings, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this RequestStrings to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Custom. */
                interface ICustom {

                    /** Custom ApplicationId */
                    ApplicationId?: (number|null);

                    /** Custom RequestId */
                    RequestId?: (number|null);

                    /** Custom Message */
                    Message?: (Uint8Array|null);
                }

                /** Represents a Custom. */
                class Custom implements ICustom {

                    /**
                     * Constructs a new Custom.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.ICustom);

                    /** Custom ApplicationId. */
                    public ApplicationId: number;

                    /** Custom RequestId. */
                    public RequestId: number;

                    /** Custom Message. */
                    public Message: Uint8Array;

                    /**
                     * Creates a new Custom instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Custom instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.ICustom): Jde.ApplicationServer.Web.FromClient.Custom;

                    /**
                     * Encodes the specified Custom message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Custom.verify|verify} messages.
                     * @param message Custom message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.ICustom, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Custom message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Custom.verify|verify} messages.
                     * @param message Custom message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.ICustom, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Custom message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.Custom;

                    /**
                     * Decodes a Custom message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.Custom;

                    /**
                     * Verifies a Custom message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Custom message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Custom
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.Custom;

                    /**
                     * Creates a plain object from a Custom message. Also converts values to other types if specified.
                     * @param message Custom
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.Custom, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Custom to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MessageUnion. */
                interface IMessageUnion {

                    /** MessageUnion Request */
                    Request?: (Jde.ApplicationServer.Web.FromClient.IRequest|null);

                    /** MessageUnion RequestId */
                    RequestId?: (Jde.ApplicationServer.Web.FromClient.IRequestId|null);

                    /** MessageUnion RequestLogs */
                    RequestLogs?: (Jde.ApplicationServer.Web.FromClient.IRequestLogs|null);

                    /** MessageUnion LogValues */
                    LogValues?: (Jde.ApplicationServer.Web.FromClient.ILogValues|null);

                    /** MessageUnion RequestStrings */
                    RequestStrings?: (Jde.ApplicationServer.Web.FromClient.IRequestStrings|null);

                    /** MessageUnion Custom */
                    Custom?: (Jde.ApplicationServer.Web.FromClient.ICustom|null);
                }

                /** Represents a MessageUnion. */
                class MessageUnion implements IMessageUnion {

                    /**
                     * Constructs a new MessageUnion.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.IMessageUnion);

                    /** MessageUnion Request. */
                    public Request?: (Jde.ApplicationServer.Web.FromClient.IRequest|null);

                    /** MessageUnion RequestId. */
                    public RequestId?: (Jde.ApplicationServer.Web.FromClient.IRequestId|null);

                    /** MessageUnion RequestLogs. */
                    public RequestLogs?: (Jde.ApplicationServer.Web.FromClient.IRequestLogs|null);

                    /** MessageUnion LogValues. */
                    public LogValues?: (Jde.ApplicationServer.Web.FromClient.ILogValues|null);

                    /** MessageUnion RequestStrings. */
                    public RequestStrings?: (Jde.ApplicationServer.Web.FromClient.IRequestStrings|null);

                    /** MessageUnion Custom. */
                    public Custom?: (Jde.ApplicationServer.Web.FromClient.ICustom|null);

                    /** MessageUnion Value. */
                    public Value?: ("Request"|"RequestId"|"RequestLogs"|"LogValues"|"RequestStrings"|"Custom");

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MessageUnion instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.IMessageUnion): Jde.ApplicationServer.Web.FromClient.MessageUnion;

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.MessageUnion;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.MessageUnion;

                    /**
                     * Verifies a MessageUnion message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a MessageUnion message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns MessageUnion
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.MessageUnion;

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @param message MessageUnion
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.MessageUnion, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Transmission. */
                interface ITransmission {

                    /** Transmission Messages */
                    Messages?: (Jde.ApplicationServer.Web.FromClient.IMessageUnion[]|null);
                }

                /** Represents a Transmission. */
                class Transmission implements ITransmission {

                    /**
                     * Constructs a new Transmission.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromClient.ITransmission);

                    /** Transmission Messages. */
                    public Messages: Jde.ApplicationServer.Web.FromClient.IMessageUnion[];

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Transmission instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromClient.ITransmission): Jde.ApplicationServer.Web.FromClient.Transmission;

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromClient.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromClient.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromClient.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromClient.Transmission;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromClient.Transmission;

                    /**
                     * Verifies a Transmission message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Transmission message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Transmission
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromClient.Transmission;

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @param message Transmission
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromClient.Transmission, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Transmission to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }
        }
    }
}
