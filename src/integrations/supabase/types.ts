export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      creator_applications: {
        Row: {
          channel_description: string
          channel_name: string
          content_type: string
          id: string
          ministry_background: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sample_content_urls: string[] | null
          status: Database["public"]["Enums"]["creator_status"]
          submitted_at: string
          user_id: string
        }
        Insert: {
          channel_description: string
          channel_name: string
          content_type: string
          id?: string
          ministry_background?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_content_urls?: string[] | null
          status?: Database["public"]["Enums"]["creator_status"]
          submitted_at?: string
          user_id: string
        }
        Update: {
          channel_description?: string
          channel_name?: string
          content_type?: string
          id?: string
          ministry_background?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sample_content_urls?: string[] | null
          status?: Database["public"]["Enums"]["creator_status"]
          submitted_at?: string
          user_id?: string
        }
        Relationships: []
      }
      creator_profiles: {
        Row: {
          channel_banner_url: string | null
          channel_description: string | null
          channel_name: string
          created_at: string
          id: string
          monetization_enabled: boolean
          social_links: Json | null
          subscriber_count: number
          total_views: number
          updated_at: string
          verification_status: Database["public"]["Enums"]["creator_status"]
        }
        Insert: {
          channel_banner_url?: string | null
          channel_description?: string | null
          channel_name: string
          created_at?: string
          id: string
          monetization_enabled?: boolean
          social_links?: Json | null
          subscriber_count?: number
          total_views?: number
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["creator_status"]
        }
        Update: {
          channel_banner_url?: string | null
          channel_description?: string | null
          channel_name?: string
          created_at?: string
          id?: string
          monetization_enabled?: boolean
          social_links?: Json | null
          subscriber_count?: number
          total_views?: number
          updated_at?: string
          verification_status?: Database["public"]["Enums"]["creator_status"]
        }
        Relationships: []
      }
      live_streams: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          category: string | null
          chat_enabled: boolean | null
          chat_moderation_level: string | null
          created_at: string
          creator_id: string
          current_viewers: number | null
          description: string | null
          id: string
          max_viewers: number | null
          recording_enabled: boolean | null
          recording_url: string | null
          rtmp_url: string
          scheduled_start: string | null
          status: string
          stream_key: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          total_viewers: number | null
          updated_at: string
          visibility: string
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          category?: string | null
          chat_enabled?: boolean | null
          chat_moderation_level?: string | null
          created_at?: string
          creator_id: string
          current_viewers?: number | null
          description?: string | null
          id?: string
          max_viewers?: number | null
          recording_enabled?: boolean | null
          recording_url?: string | null
          rtmp_url: string
          scheduled_start?: string | null
          status?: string
          stream_key: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          total_viewers?: number | null
          updated_at?: string
          visibility?: string
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          category?: string | null
          chat_enabled?: boolean | null
          chat_moderation_level?: string | null
          created_at?: string
          creator_id?: string
          current_viewers?: number | null
          description?: string | null
          id?: string
          max_viewers?: number | null
          recording_enabled?: boolean | null
          recording_url?: string | null
          rtmp_url?: string
          scheduled_start?: string | null
          status?: string
          stream_key?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          total_viewers?: number | null
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_streams_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      revenue_analytics: {
        Row: {
          ad_revenue: number | null
          created_at: string
          creator_id: string
          date: string
          donation_revenue: number | null
          id: string
          merchandise_revenue: number | null
          subscribers_gained: number | null
          subscribers_lost: number | null
          subscription_revenue: number | null
          total_revenue: number | null
          updated_at: string
          views_count: number | null
        }
        Insert: {
          ad_revenue?: number | null
          created_at?: string
          creator_id: string
          date: string
          donation_revenue?: number | null
          id?: string
          merchandise_revenue?: number | null
          subscribers_gained?: number | null
          subscribers_lost?: number | null
          subscription_revenue?: number | null
          total_revenue?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Update: {
          ad_revenue?: number | null
          created_at?: string
          creator_id?: string
          date?: string
          donation_revenue?: number | null
          id?: string
          merchandise_revenue?: number | null
          subscribers_gained?: number | null
          subscribers_lost?: number | null
          subscription_revenue?: number | null
          total_revenue?: number | null
          updated_at?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "revenue_analytics_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_analytics: {
        Row: {
          average_watch_time: number | null
          chat_messages_count: number | null
          concurrent_viewers: number | null
          donations_amount: number | null
          donations_count: number | null
          id: string
          new_followers: number | null
          peak_concurrent_viewers: number | null
          stream_id: string
          timestamp: string
        }
        Insert: {
          average_watch_time?: number | null
          chat_messages_count?: number | null
          concurrent_viewers?: number | null
          donations_amount?: number | null
          donations_count?: number | null
          id?: string
          new_followers?: number | null
          peak_concurrent_viewers?: number | null
          stream_id: string
          timestamp?: string
        }
        Update: {
          average_watch_time?: number | null
          chat_messages_count?: number | null
          concurrent_viewers?: number | null
          donations_amount?: number | null
          donations_count?: number | null
          id?: string
          new_followers?: number | null
          peak_concurrent_viewers?: number | null
          stream_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "stream_analytics_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
        ]
      }
      stream_chat_messages: {
        Row: {
          created_at: string
          donation_amount: number | null
          id: string
          is_highlighted: boolean | null
          is_moderator: boolean | null
          message: string
          message_type: string | null
          status: string
          stream_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          donation_amount?: number | null
          id?: string
          is_highlighted?: boolean | null
          is_moderator?: boolean | null
          message: string
          message_type?: string | null
          status?: string
          stream_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          donation_amount?: number | null
          id?: string
          is_highlighted?: boolean | null
          is_moderator?: boolean | null
          message?: string
          message_type?: string | null
          status?: string
          stream_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stream_chat_messages_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stream_chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_sessions: {
        Row: {
          chunk_size: number
          created_at: string | null
          expires_at: string | null
          filename: string
          id: string
          metadata: Json | null
          status: string | null
          total_chunks: number
          total_size: number
          updated_at: string | null
          uploaded_chunks: number | null
          user_id: string
        }
        Insert: {
          chunk_size?: number
          created_at?: string | null
          expires_at?: string | null
          filename: string
          id?: string
          metadata?: Json | null
          status?: string | null
          total_chunks: number
          total_size: number
          updated_at?: string | null
          uploaded_chunks?: number | null
          user_id: string
        }
        Update: {
          chunk_size?: number
          created_at?: string | null
          expires_at?: string | null
          filename?: string
          id?: string
          metadata?: Json | null
          status?: string | null
          total_chunks?: number
          total_size?: number
          updated_at?: string | null
          uploaded_chunks?: number | null
          user_id?: string
        }
        Relationships: []
      }
      video_analytics: {
        Row: {
          average_watch_time: number | null
          bounce_rate: number | null
          click_through_rate: number | null
          comments_count: number | null
          created_at: string
          dislikes_count: number | null
          id: string
          likes_count: number | null
          retention_rate: number | null
          shares_count: number | null
          total_watch_time: number | null
          unique_viewers: number | null
          updated_at: string
          video_id: string
          view_count: number | null
        }
        Insert: {
          average_watch_time?: number | null
          bounce_rate?: number | null
          click_through_rate?: number | null
          comments_count?: number | null
          created_at?: string
          dislikes_count?: number | null
          id?: string
          likes_count?: number | null
          retention_rate?: number | null
          shares_count?: number | null
          total_watch_time?: number | null
          unique_viewers?: number | null
          updated_at?: string
          video_id: string
          view_count?: number | null
        }
        Update: {
          average_watch_time?: number | null
          bounce_rate?: number | null
          click_through_rate?: number | null
          comments_count?: number | null
          created_at?: string
          dislikes_count?: number | null
          id?: string
          likes_count?: number | null
          retention_rate?: number | null
          shares_count?: number | null
          total_watch_time?: number | null
          unique_viewers?: number | null
          updated_at?: string
          video_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "video_analytics_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          likes_count: number | null
          parent_comment_id: string | null
          replies_count: number | null
          status: string
          timestamp_seconds: number | null
          updated_at: string
          user_id: string
          video_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          replies_count?: number | null
          status?: string
          timestamp_seconds?: number | null
          updated_at?: string
          user_id: string
          video_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          parent_comment_id?: string | null
          replies_count?: number | null
          status?: string
          timestamp_seconds?: number | null
          updated_at?: string
          user_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "video_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_comments_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      video_processing_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_type: string
          progress: number | null
          started_at: string | null
          status: string
          video_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type: string
          progress?: number | null
          started_at?: string | null
          status?: string
          video_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_type?: string
          progress?: number | null
          started_at?: string | null
          status?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_processing_jobs_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          ads_enabled: boolean | null
          category: string | null
          created_at: string
          creator_id: string
          description: string | null
          duration: number | null
          file_size: number | null
          id: string
          membership_required: boolean | null
          monetization_enabled: boolean | null
          processing_progress: number | null
          processing_status: string | null
          published_at: string | null
          resolution: string | null
          status: string
          tags: string[] | null
          thumbnail_generated: boolean | null
          thumbnail_url: string | null
          title: string
          transcoding_completed: boolean | null
          updated_at: string
          video_format: string | null
          video_url: string | null
          visibility: string
        }
        Insert: {
          ads_enabled?: boolean | null
          category?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          membership_required?: boolean | null
          monetization_enabled?: boolean | null
          processing_progress?: number | null
          processing_status?: string | null
          published_at?: string | null
          resolution?: string | null
          status?: string
          tags?: string[] | null
          thumbnail_generated?: boolean | null
          thumbnail_url?: string | null
          title: string
          transcoding_completed?: boolean | null
          updated_at?: string
          video_format?: string | null
          video_url?: string | null
          visibility?: string
        }
        Update: {
          ads_enabled?: boolean | null
          category?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          duration?: number | null
          file_size?: number | null
          id?: string
          membership_required?: boolean | null
          monetization_enabled?: boolean | null
          processing_progress?: number | null
          processing_status?: string | null
          published_at?: string | null
          resolution?: string | null
          status?: string
          tags?: string[] | null
          thumbnail_generated?: boolean | null
          thumbnail_url?: string | null
          title?: string
          transcoding_completed?: boolean | null
          updated_at?: string
          video_format?: string | null
          video_url?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      viewer_sessions: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          exit_point: number | null
          id: string
          interactions: Json | null
          progress_percent: number | null
          referrer: string | null
          region: string | null
          session_id: string
          stream_id: string | null
          video_id: string | null
          viewer_id: string | null
          watch_duration: number | null
          watch_end: string | null
          watch_start: string
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          exit_point?: number | null
          id?: string
          interactions?: Json | null
          progress_percent?: number | null
          referrer?: string | null
          region?: string | null
          session_id: string
          stream_id?: string | null
          video_id?: string | null
          viewer_id?: string | null
          watch_duration?: number | null
          watch_end?: string | null
          watch_start?: string
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          exit_point?: number | null
          id?: string
          interactions?: Json | null
          progress_percent?: number | null
          referrer?: string | null
          region?: string | null
          session_id?: string
          stream_id?: string | null
          video_id?: string | null
          viewer_id?: string | null
          watch_duration?: number | null
          watch_end?: string | null
          watch_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "viewer_sessions_stream_id_fkey"
            columns: ["stream_id"]
            isOneToOne: false
            referencedRelation: "live_streams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "viewer_sessions_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "viewer_sessions_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_upload_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_stream_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_stream_viewers: {
        Args: { p_stream_id: string; p_viewer_count: number }
        Returns: undefined
      }
      update_video_analytics: {
        Args: {
          p_video_id: string
          p_view_increment?: number
          p_watch_time_increment?: number
        }
        Returns: undefined
      }
    }
    Enums: {
      creator_status: "pending" | "approved" | "rejected" | "suspended"
      user_role: "user" | "creator" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      creator_status: ["pending", "approved", "rejected", "suspended"],
      user_role: ["user", "creator", "admin"],
    },
  },
} as const
