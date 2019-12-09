import * as $protobuf from "protobufjs";
/** Namespace Jde. */
export namespace Jde {

    /** Namespace ApplicationServer. */
    namespace ApplicationServer {

        /** Namespace Web. */
        namespace Web {

            /** Namespace FromServer. */
            namespace FromServer {

                /** Properties of an Acknowledgement. */
                interface IAcknowledgement {

                    /** Acknowledgement Id */
                    Id?: (number|null);
                }

                /** Represents an Acknowledgement. */
                class Acknowledgement implements IAcknowledgement {

                    /**
                     * Constructs a new Acknowledgement.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IAcknowledgement);

                    /** Acknowledgement Id. */
                    public Id: number;

                    /**
                     * Creates a new Acknowledgement instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Acknowledgement instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IAcknowledgement): Jde.ApplicationServer.Web.FromServer.Acknowledgement;

                    /**
                     * Encodes the specified Acknowledgement message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Acknowledgement.verify|verify} messages.
                     * @param message Acknowledgement message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IAcknowledgement, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Acknowledgement message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Acknowledgement.verify|verify} messages.
                     * @param message Acknowledgement message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IAcknowledgement, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Acknowledgement message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Acknowledgement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Acknowledgement;

                    /**
                     * Decodes an Acknowledgement message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Acknowledgement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Acknowledgement;

                    /**
                     * Verifies an Acknowledgement message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Acknowledgement message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Acknowledgement
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Acknowledgement;

                    /**
                     * Creates a plain object from an Acknowledgement message. Also converts values to other types if specified.
                     * @param message Acknowledgement
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Acknowledgement, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Acknowledgement to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** ELogLevel enum. */
                enum ELogLevel {
                    Trace = 0,
                    Debug = 1,
                    Information = 2,
                    Warning = 3,
                    Error = 4,
                    Critical = 5,
                    None = 6
                }

                /** Properties of an Application. */
                interface IApplication {

                    /** Application Id */
                    Id?: (number|null);

                    /** Application Name */
                    Name?: (string|null);

                    /** Application DbLevel */
                    DbLevel?: (Jde.ApplicationServer.Web.FromServer.ELogLevel|null);

                    /** Application FileLevel */
                    FileLevel?: (Jde.ApplicationServer.Web.FromServer.ELogLevel|null);
                }

                /** Represents an Application. */
                class Application implements IApplication {

                    /**
                     * Constructs a new Application.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IApplication);

                    /** Application Id. */
                    public Id: number;

                    /** Application Name. */
                    public Name: string;

                    /** Application DbLevel. */
                    public DbLevel: Jde.ApplicationServer.Web.FromServer.ELogLevel;

                    /** Application FileLevel. */
                    public FileLevel: Jde.ApplicationServer.Web.FromServer.ELogLevel;

                    /**
                     * Creates a new Application instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Application instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IApplication): Jde.ApplicationServer.Web.FromServer.Application;

                    /**
                     * Encodes the specified Application message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Application.verify|verify} messages.
                     * @param message Application message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IApplication, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Application message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Application.verify|verify} messages.
                     * @param message Application message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IApplication, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Application message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Application
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Application;

                    /**
                     * Decodes an Application message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Application
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Application;

                    /**
                     * Verifies an Application message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Application message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Application
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Application;

                    /**
                     * Creates a plain object from an Application message. Also converts values to other types if specified.
                     * @param message Application
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Application, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Application to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an Applications. */
                interface IApplications {

                    /** Applications Values */
                    Values?: (Jde.ApplicationServer.Web.FromServer.IApplication[]|null);
                }

                /** Represents an Applications. */
                class Applications implements IApplications {

                    /**
                     * Constructs a new Applications.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IApplications);

                    /** Applications Values. */
                    public Values: Jde.ApplicationServer.Web.FromServer.IApplication[];

                    /**
                     * Creates a new Applications instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Applications instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IApplications): Jde.ApplicationServer.Web.FromServer.Applications;

                    /**
                     * Encodes the specified Applications message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Applications.verify|verify} messages.
                     * @param message Applications message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IApplications, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Applications message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Applications.verify|verify} messages.
                     * @param message Applications message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IApplications, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Applications message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Applications
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Applications;

                    /**
                     * Decodes an Applications message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Applications
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Applications;

                    /**
                     * Verifies an Applications message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an Applications message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Applications
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Applications;

                    /**
                     * Creates a plain object from an Applications message. Also converts values to other types if specified.
                     * @param message Applications
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Applications, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Applications to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Status. */
                interface IStatus {

                    /** Status ApplicationId */
                    ApplicationId?: (number|null);

                    /** Status InstanceId */
                    InstanceId?: (number|null);

                    /** Status HostName */
                    HostName?: (string|null);

                    /** Status StartTime */
                    StartTime?: (number|null);

                    /** Status Memory */
                    Memory?: (number|Long|null);

                    /** Status LogCount */
                    LogCount?: (number|null);

                    /** Status Cpu */
                    Cpu?: (number|null);

                    /** Status DBLogLevel */
                    DBLogLevel?: (Jde.ApplicationServer.Web.FromServer.ELogLevel|null);

                    /** Status FileLogLevel */
                    FileLogLevel?: (Jde.ApplicationServer.Web.FromServer.ELogLevel|null);

                    /** Status Values */
                    Values?: (string[]|null);
                }

                /** Represents a Status. */
                class Status implements IStatus {

                    /**
                     * Constructs a new Status.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IStatus);

                    /** Status ApplicationId. */
                    public ApplicationId: number;

                    /** Status InstanceId. */
                    public InstanceId: number;

                    /** Status HostName. */
                    public HostName: string;

                    /** Status StartTime. */
                    public StartTime: number;

                    /** Status Memory. */
                    public Memory: (number|Long);

                    /** Status LogCount. */
                    public LogCount: number;

                    /** Status Cpu. */
                    public Cpu: number;

                    /** Status DBLogLevel. */
                    public DBLogLevel: Jde.ApplicationServer.Web.FromServer.ELogLevel;

                    /** Status FileLogLevel. */
                    public FileLogLevel: Jde.ApplicationServer.Web.FromServer.ELogLevel;

                    /** Status Values. */
                    public Values: string[];

                    /**
                     * Creates a new Status instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Status instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IStatus): Jde.ApplicationServer.Web.FromServer.Status;

                    /**
                     * Encodes the specified Status message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Status.verify|verify} messages.
                     * @param message Status message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Status message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Status.verify|verify} messages.
                     * @param message Status message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Status message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Status
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Status;

                    /**
                     * Decodes a Status message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Status
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Status;

                    /**
                     * Verifies a Status message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Status message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Status
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Status;

                    /**
                     * Creates a plain object from a Status message. Also converts values to other types if specified.
                     * @param message Status
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Status, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Status to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Statuses. */
                interface IStatuses {

                    /** Statuses Values */
                    Values?: (Jde.ApplicationServer.Web.FromServer.IStatus[]|null);
                }

                /** Represents a Statuses. */
                class Statuses implements IStatuses {

                    /**
                     * Constructs a new Statuses.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IStatuses);

                    /** Statuses Values. */
                    public Values: Jde.ApplicationServer.Web.FromServer.IStatus[];

                    /**
                     * Creates a new Statuses instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Statuses instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IStatuses): Jde.ApplicationServer.Web.FromServer.Statuses;

                    /**
                     * Encodes the specified Statuses message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Statuses.verify|verify} messages.
                     * @param message Statuses message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IStatuses, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Statuses message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Statuses.verify|verify} messages.
                     * @param message Statuses message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IStatuses, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Statuses message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Statuses
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Statuses;

                    /**
                     * Decodes a Statuses message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Statuses
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Statuses;

                    /**
                     * Verifies a Statuses message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Statuses message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Statuses
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Statuses;

                    /**
                     * Creates a plain object from a Statuses message. Also converts values to other types if specified.
                     * @param message Statuses
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Statuses, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Statuses to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a TraceMessage. */
                interface ITraceMessage {

                    /** TraceMessage InstanceId */
                    InstanceId?: (number|Long|null);

                    /** TraceMessage Time */
                    Time?: (number|Long|null);

                    /** TraceMessage Level */
                    Level?: (Jde.ApplicationServer.Web.FromServer.ELogLevel|null);

                    /** TraceMessage MessageId */
                    MessageId?: (number|null);

                    /** TraceMessage FileId */
                    FileId?: (number|null);

                    /** TraceMessage FunctionId */
                    FunctionId?: (number|null);

                    /** TraceMessage LineNumber */
                    LineNumber?: (number|null);

                    /** TraceMessage UserId */
                    UserId?: (number|null);

                    /** TraceMessage ThreadId */
                    ThreadId?: (number|Long|null);

                    /** TraceMessage Variables */
                    Variables?: (string[]|null);
                }

                /** Represents a TraceMessage. */
                class TraceMessage implements ITraceMessage {

                    /**
                     * Constructs a new TraceMessage.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.ITraceMessage);

                    /** TraceMessage InstanceId. */
                    public InstanceId: (number|Long);

                    /** TraceMessage Time. */
                    public Time: (number|Long);

                    /** TraceMessage Level. */
                    public Level: Jde.ApplicationServer.Web.FromServer.ELogLevel;

                    /** TraceMessage MessageId. */
                    public MessageId: number;

                    /** TraceMessage FileId. */
                    public FileId: number;

                    /** TraceMessage FunctionId. */
                    public FunctionId: number;

                    /** TraceMessage LineNumber. */
                    public LineNumber: number;

                    /** TraceMessage UserId. */
                    public UserId: number;

                    /** TraceMessage ThreadId. */
                    public ThreadId: (number|Long);

                    /** TraceMessage Variables. */
                    public Variables: string[];

                    /**
                     * Creates a new TraceMessage instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TraceMessage instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.ITraceMessage): Jde.ApplicationServer.Web.FromServer.TraceMessage;

                    /**
                     * Encodes the specified TraceMessage message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.TraceMessage.verify|verify} messages.
                     * @param message TraceMessage message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.ITraceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified TraceMessage message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.TraceMessage.verify|verify} messages.
                     * @param message TraceMessage message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.ITraceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TraceMessage message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns TraceMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.TraceMessage;

                    /**
                     * Decodes a TraceMessage message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns TraceMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.TraceMessage;

                    /**
                     * Verifies a TraceMessage message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a TraceMessage message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns TraceMessage
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.TraceMessage;

                    /**
                     * Creates a plain object from a TraceMessage message. Also converts values to other types if specified.
                     * @param message TraceMessage
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.TraceMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this TraceMessage to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Traces. */
                interface ITraces {

                    /** Traces ApplicationId */
                    ApplicationId?: (number|null);

                    /** Traces Values */
                    Values?: (Jde.ApplicationServer.Web.FromServer.ITraceMessage[]|null);
                }

                /** Represents a Traces. */
                class Traces implements ITraces {

                    /**
                     * Constructs a new Traces.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.ITraces);

                    /** Traces ApplicationId. */
                    public ApplicationId: number;

                    /** Traces Values. */
                    public Values: Jde.ApplicationServer.Web.FromServer.ITraceMessage[];

                    /**
                     * Creates a new Traces instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Traces instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.ITraces): Jde.ApplicationServer.Web.FromServer.Traces;

                    /**
                     * Encodes the specified Traces message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Traces.verify|verify} messages.
                     * @param message Traces message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.ITraces, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Traces message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Traces.verify|verify} messages.
                     * @param message Traces message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.ITraces, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Traces message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Traces
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Traces;

                    /**
                     * Decodes a Traces message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Traces
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Traces;

                    /**
                     * Verifies a Traces message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a Traces message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns Traces
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Traces;

                    /**
                     * Creates a plain object from a Traces message. Also converts values to other types if specified.
                     * @param message Traces
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Traces, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Traces to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ApplicationString. */
                interface IApplicationString {

                    /** ApplicationString StringRequestType */
                    StringRequestType?: (number|null);

                    /** ApplicationString Id */
                    Id?: (number|null);

                    /** ApplicationString Value */
                    Value?: (string|null);
                }

                /** Represents an ApplicationString. */
                class ApplicationString implements IApplicationString {

                    /**
                     * Constructs a new ApplicationString.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IApplicationString);

                    /** ApplicationString StringRequestType. */
                    public StringRequestType: number;

                    /** ApplicationString Id. */
                    public Id: number;

                    /** ApplicationString Value. */
                    public Value: string;

                    /**
                     * Creates a new ApplicationString instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ApplicationString instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IApplicationString): Jde.ApplicationServer.Web.FromServer.ApplicationString;

                    /**
                     * Encodes the specified ApplicationString message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationString.verify|verify} messages.
                     * @param message ApplicationString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IApplicationString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ApplicationString message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationString.verify|verify} messages.
                     * @param message ApplicationString message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IApplicationString, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ApplicationString message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ApplicationString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.ApplicationString;

                    /**
                     * Decodes an ApplicationString message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ApplicationString
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.ApplicationString;

                    /**
                     * Verifies an ApplicationString message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ApplicationString message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ApplicationString
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.ApplicationString;

                    /**
                     * Creates a plain object from an ApplicationString message. Also converts values to other types if specified.
                     * @param message ApplicationString
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.ApplicationString, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ApplicationString to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ApplicationStrings. */
                interface IApplicationStrings {

                    /** ApplicationStrings RequestId */
                    RequestId?: (number|null);

                    /** ApplicationStrings ApplicationId */
                    ApplicationId?: (number|null);

                    /** ApplicationStrings Values */
                    Values?: (Jde.ApplicationServer.Web.FromServer.IApplicationString[]|null);
                }

                /** Represents an ApplicationStrings. */
                class ApplicationStrings implements IApplicationStrings {

                    /**
                     * Constructs a new ApplicationStrings.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IApplicationStrings);

                    /** ApplicationStrings RequestId. */
                    public RequestId: number;

                    /** ApplicationStrings ApplicationId. */
                    public ApplicationId: number;

                    /** ApplicationStrings Values. */
                    public Values: Jde.ApplicationServer.Web.FromServer.IApplicationString[];

                    /**
                     * Creates a new ApplicationStrings instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ApplicationStrings instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IApplicationStrings): Jde.ApplicationServer.Web.FromServer.ApplicationStrings;

                    /**
                     * Encodes the specified ApplicationStrings message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationStrings.verify|verify} messages.
                     * @param message ApplicationStrings message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IApplicationStrings, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ApplicationStrings message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ApplicationStrings.verify|verify} messages.
                     * @param message ApplicationStrings message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IApplicationStrings, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ApplicationStrings message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ApplicationStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.ApplicationStrings;

                    /**
                     * Decodes an ApplicationStrings message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ApplicationStrings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.ApplicationStrings;

                    /**
                     * Verifies an ApplicationStrings message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ApplicationStrings message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ApplicationStrings
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.ApplicationStrings;

                    /**
                     * Creates a plain object from an ApplicationStrings message. Also converts values to other types if specified.
                     * @param message ApplicationStrings
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.ApplicationStrings, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ApplicationStrings to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of an ErrorMessage. */
                interface IErrorMessage {

                    /** ErrorMessage RequestId */
                    RequestId?: (number|null);

                    /** ErrorMessage Message */
                    Message?: (string|null);
                }

                /** Represents an ErrorMessage. */
                class ErrorMessage implements IErrorMessage {

                    /**
                     * Constructs a new ErrorMessage.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IErrorMessage);

                    /** ErrorMessage RequestId. */
                    public RequestId: number;

                    /** ErrorMessage Message. */
                    public Message: string;

                    /**
                     * Creates a new ErrorMessage instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ErrorMessage instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IErrorMessage): Jde.ApplicationServer.Web.FromServer.ErrorMessage;

                    /**
                     * Encodes the specified ErrorMessage message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ErrorMessage.verify|verify} messages.
                     * @param message ErrorMessage message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ErrorMessage message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.ErrorMessage.verify|verify} messages.
                     * @param message ErrorMessage message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IErrorMessage, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an ErrorMessage message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ErrorMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.ErrorMessage;

                    /**
                     * Decodes an ErrorMessage message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ErrorMessage
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.ErrorMessage;

                    /**
                     * Verifies an ErrorMessage message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates an ErrorMessage message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ErrorMessage
                     */
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.ErrorMessage;

                    /**
                     * Creates a plain object from an ErrorMessage message. Also converts values to other types if specified.
                     * @param message ErrorMessage
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.ErrorMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ErrorMessage to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Custom. */
                interface ICustom {

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
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.ICustom);

                    /** Custom RequestId. */
                    public RequestId: number;

                    /** Custom Message. */
                    public Message: Uint8Array;

                    /**
                     * Creates a new Custom instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Custom instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.ICustom): Jde.ApplicationServer.Web.FromServer.Custom;

                    /**
                     * Encodes the specified Custom message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Custom.verify|verify} messages.
                     * @param message Custom message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.ICustom, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Custom message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Custom.verify|verify} messages.
                     * @param message Custom message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.ICustom, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Custom message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Custom;

                    /**
                     * Decodes a Custom message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Custom
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Custom;

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
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Custom;

                    /**
                     * Creates a plain object from a Custom message. Also converts values to other types if specified.
                     * @param message Custom
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Custom, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this Custom to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a MessageUnion. */
                interface IMessageUnion {

                    /** MessageUnion Traces */
                    Traces?: (Jde.ApplicationServer.Web.FromServer.ITraces|null);

                    /** MessageUnion Statuses */
                    Statuses?: (Jde.ApplicationServer.Web.FromServer.IStatuses|null);

                    /** MessageUnion Acknowledgement */
                    Acknowledgement?: (Jde.ApplicationServer.Web.FromServer.IAcknowledgement|null);

                    /** MessageUnion Strings */
                    Strings?: (Jde.ApplicationServer.Web.FromServer.IApplicationStrings|null);

                    /** MessageUnion Applications */
                    Applications?: (Jde.ApplicationServer.Web.FromServer.IApplications|null);

                    /** MessageUnion Error */
                    Error?: (Jde.ApplicationServer.Web.FromServer.IErrorMessage|null);

                    /** MessageUnion Custom */
                    Custom?: (Jde.ApplicationServer.Web.FromServer.ICustom|null);
                }

                /** Represents a MessageUnion. */
                class MessageUnion implements IMessageUnion {

                    /**
                     * Constructs a new MessageUnion.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.IMessageUnion);

                    /** MessageUnion Traces. */
                    public Traces?: (Jde.ApplicationServer.Web.FromServer.ITraces|null);

                    /** MessageUnion Statuses. */
                    public Statuses?: (Jde.ApplicationServer.Web.FromServer.IStatuses|null);

                    /** MessageUnion Acknowledgement. */
                    public Acknowledgement?: (Jde.ApplicationServer.Web.FromServer.IAcknowledgement|null);

                    /** MessageUnion Strings. */
                    public Strings?: (Jde.ApplicationServer.Web.FromServer.IApplicationStrings|null);

                    /** MessageUnion Applications. */
                    public Applications?: (Jde.ApplicationServer.Web.FromServer.IApplications|null);

                    /** MessageUnion Error. */
                    public Error?: (Jde.ApplicationServer.Web.FromServer.IErrorMessage|null);

                    /** MessageUnion Custom. */
                    public Custom?: (Jde.ApplicationServer.Web.FromServer.ICustom|null);

                    /** MessageUnion Value. */
                    public Value?: ("Traces"|"Statuses"|"Acknowledgement"|"Strings"|"Applications"|"Error"|"Custom");

                    /**
                     * Creates a new MessageUnion instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MessageUnion instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.IMessageUnion): Jde.ApplicationServer.Web.FromServer.MessageUnion;

                    /**
                     * Encodes the specified MessageUnion message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified MessageUnion message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.MessageUnion.verify|verify} messages.
                     * @param message MessageUnion message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.IMessageUnion, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.MessageUnion;

                    /**
                     * Decodes a MessageUnion message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns MessageUnion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.MessageUnion;

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
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.MessageUnion;

                    /**
                     * Creates a plain object from a MessageUnion message. Also converts values to other types if specified.
                     * @param message MessageUnion
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.MessageUnion, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this MessageUnion to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }

                /** Properties of a Transmission. */
                interface ITransmission {

                    /** Transmission Messages */
                    Messages?: (Jde.ApplicationServer.Web.FromServer.IMessageUnion[]|null);
                }

                /** Represents a Transmission. */
                class Transmission implements ITransmission {

                    /**
                     * Constructs a new Transmission.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: Jde.ApplicationServer.Web.FromServer.ITransmission);

                    /** Transmission Messages. */
                    public Messages: Jde.ApplicationServer.Web.FromServer.IMessageUnion[];

                    /**
                     * Creates a new Transmission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Transmission instance
                     */
                    public static create(properties?: Jde.ApplicationServer.Web.FromServer.ITransmission): Jde.ApplicationServer.Web.FromServer.Transmission;

                    /**
                     * Encodes the specified Transmission message. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: Jde.ApplicationServer.Web.FromServer.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified Transmission message, length delimited. Does not implicitly {@link Jde.ApplicationServer.Web.FromServer.Transmission.verify|verify} messages.
                     * @param message Transmission message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: Jde.ApplicationServer.Web.FromServer.ITransmission, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Jde.ApplicationServer.Web.FromServer.Transmission;

                    /**
                     * Decodes a Transmission message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns Transmission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Jde.ApplicationServer.Web.FromServer.Transmission;

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
                    public static fromObject(object: { [k: string]: any }): Jde.ApplicationServer.Web.FromServer.Transmission;

                    /**
                     * Creates a plain object from a Transmission message. Also converts values to other types if specified.
                     * @param message Transmission
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: Jde.ApplicationServer.Web.FromServer.Transmission, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
