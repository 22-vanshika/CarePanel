// Exports interfaces defining the shape of a notification entity.
export type NotificationType =
    | 'INFO'
    | 'WARNING'
    | 'SUCCESS'
    | 'ERROR';

/**
 * Structure of a system-generated alert or message
 */
export interface AppNotification {
    /** Unique identifier for the notification */
    id: string;
    /** Brief summary heading */
    title: string;
    /** Detailed message content */
    body: string;
    /** Category determining the visual treatment */
    type: NotificationType;
    /** ISO 8601 string of when the alert was triggered */
    timestamp: string;
    /** Boolean flag tracking user interaction */
    read: boolean;
}
// interface was chosen to permit adding navigation links or action payloads to notifications later.