export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string | null
          date: string
          id: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          status: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          category: string
          created_at: string | null
          id: string
          message: string
          status: string | null
          subject: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          message: string
          status?: string | null
          subject: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          message?: string
          status?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      fees: {
        Row: {
          academic_year: string
          amount: number
          created_at: string | null
          due_date: string
          fee_type: string
          id: string
          paid_date: string | null
          semester: number
          status: string | null
          user_id: string
        }
        Insert: {
          academic_year: string
          amount: number
          created_at?: string | null
          due_date: string
          fee_type: string
          id?: string
          paid_date?: string | null
          semester: number
          status?: string | null
          user_id: string
        }
        Update: {
          academic_year?: string
          amount?: number
          created_at?: string | null
          due_date?: string
          fee_type?: string
          id?: string
          paid_date?: string | null
          semester?: number
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      library_books: {
        Row: {
          author: string
          available_copies: number | null
          category: string
          created_at: string | null
          id: string
          isbn: string | null
          title: string
          total_copies: number | null
        }
        Insert: {
          author: string
          available_copies?: number | null
          category: string
          created_at?: string | null
          id?: string
          isbn?: string | null
          title: string
          total_copies?: number | null
        }
        Update: {
          author?: string
          available_copies?: number | null
          category?: string
          created_at?: string | null
          id?: string
          isbn?: string | null
          title?: string
          total_copies?: number | null
        }
        Relationships: []
      }
      library_borrowings: {
        Row: {
          book_id: string
          borrowed_date: string | null
          created_at: string | null
          due_date: string
          id: string
          returned_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          book_id: string
          borrowed_date?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          returned_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          book_id?: string
          borrowed_date?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          returned_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "library_borrowings_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "library_books"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          semester: number | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          semester?: number | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          semester?: number | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      results: {
        Row: {
          academic_year: string
          created_at: string | null
          exam_type: string
          grade: string | null
          id: string
          marks_obtained: number
          max_marks: number
          semester: number
          subject: string
          user_id: string
        }
        Insert: {
          academic_year: string
          created_at?: string | null
          exam_type: string
          grade?: string | null
          id?: string
          marks_obtained: number
          max_marks: number
          semester: number
          subject: string
          user_id: string
        }
        Update: {
          academic_year?: string
          created_at?: string | null
          exam_type?: string
          grade?: string | null
          id?: string
          marks_obtained?: number
          max_marks?: number
          semester?: number
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      timetable: {
        Row: {
          created_at: string | null
          day_of_week: string
          department: string
          end_time: string
          id: string
          room: string
          semester: number
          start_time: string
          subject: string
          teacher: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: string
          department: string
          end_time: string
          id?: string
          room: string
          semester: number
          start_time: string
          subject: string
          teacher: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: string
          department?: string
          end_time?: string
          id?: string
          room?: string
          semester?: number
          start_time?: string
          subject?: string
          teacher?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
