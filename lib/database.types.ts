// lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          google_access_token: string | null;
          google_refresh_token: string | null;
          google_token_expires_at: string | null;
          google_calendar_id: string | null;
          summary_time: string | null;
          timezone: string;
          telegram_chat_id: string | null;
          telegram_enabled: boolean;
          email_notifications_enabled: boolean;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          google_access_token?: string | null;
          google_refresh_token?: string | null;
          google_token_expires_at?: string | null;
          google_calendar_id?: string | null;
          summary_time?: string | null;
          timezone?: string;
          telegram_chat_id?: string | null;
          telegram_enabled?: boolean;
          email_notifications_enabled?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          google_access_token?: string | null;
          google_refresh_token?: string | null;
          google_token_expires_at?: string | null;
          google_calendar_id?: string | null;
          summary_time?: string | null;
          timezone?: string;
          telegram_chat_id?: string | null;
          telegram_enabled?: boolean;
          email_notifications_enabled?: boolean;
        };
      };
    };
  };
}
