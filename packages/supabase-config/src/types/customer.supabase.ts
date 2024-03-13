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
      Affiliates: {
        Row: {
          created_at: string | null
          customer_id: number | null
          id: number
          password: string | null
          paypal_address: string | null
          referral_link: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: number | null
          id?: number
          password?: string | null
          paypal_address?: string | null
          referral_link?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: number | null
          id?: number
          password?: string | null
          paypal_address?: string | null
          referral_link?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Affiliates_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          }
        ]
      }
      Customers: {
        Row: {
          companyName: string | null
          created_at: string | null
          email: string | null
          firstName: string | null
          id: number
          lastName: string | null
          password: string | null
          phoneNumber: string | null
          stripeId: string | null
          title: string | null
        }
        Insert: {
          companyName?: string | null
          created_at?: string | null
          email?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          password?: string | null
          phoneNumber?: string | null
          stripeId?: string | null
          title?: string | null
        }
        Update: {
          companyName?: string | null
          created_at?: string | null
          email?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          password?: string | null
          phoneNumber?: string | null
          stripeId?: string | null
          title?: string | null
        }
        Relationships: []
      }
      Feedback: {
        Row: {
          created_at: string
          customerID: number | null
          id: number
          orderID: number | null
          pilotID: number | null
          ratingReason: string | null
          ratingScore: string | null
        }
        Insert: {
          created_at?: string
          customerID?: number | null
          id?: number
          orderID?: number | null
          pilotID?: number | null
          ratingReason?: string | null
          ratingScore?: string | null
        }
        Update: {
          created_at?: string
          customerID?: number | null
          id?: number
          orderID?: number | null
          pilotID?: number | null
          ratingReason?: string | null
          ratingScore?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Feedback_customerID_fkey"
            columns: ["customerID"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Feedback_orderID_fkey"
            columns: ["orderID"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["id"]
          }
        ]
      }
      Orders: {
        Row: {
          address: string | null
          amount: number | null
          app_version: Database["public"]["Enums"]["appVersion"] | null
          area: number | null
          arrivalTime: Database["public"]["Enums"]["timeSlots"] | null
          authUserId: string | null
          billing_address: Json | null
          captureFormat: string | null
          created_at: string | null
          customerID: number | null
          customerNote: string | null
          date: string | null
          datePaid: string | null
          deliverableURLs: Json[] | null
          environment: string | null
          extendDuration: number | null
          id: number
          includedDuration: number | null
          invoiceURL: string | null
          mapData: Json | null
          paymentCharge_id: string | null
          paymentID: string | null
          pilotExpertize: string | null
          pilotID: number | null
          status: string | null
          storagePlan: Json | null
          subscriptionId: string | null
          time_option: Database["public"]["Enums"]["timeOptions"] | null
          zipfile_link: string | null
          zipfile_path: string | null
        }
        Insert: {
          address?: string | null
          amount?: number | null
          app_version?: Database["public"]["Enums"]["appVersion"] | null
          area?: number | null
          arrivalTime?: Database["public"]["Enums"]["timeSlots"] | null
          authUserId?: string | null
          billing_address?: Json | null
          captureFormat?: string | null
          created_at?: string | null
          customerID?: number | null
          customerNote?: string | null
          date?: string | null
          datePaid?: string | null
          deliverableURLs?: Json[] | null
          environment?: string | null
          extendDuration?: number | null
          id?: number
          includedDuration?: number | null
          invoiceURL?: string | null
          mapData?: Json | null
          paymentCharge_id?: string | null
          paymentID?: string | null
          pilotExpertize?: string | null
          pilotID?: number | null
          status?: string | null
          storagePlan?: Json | null
          subscriptionId?: string | null
          time_option?: Database["public"]["Enums"]["timeOptions"] | null
          zipfile_link?: string | null
          zipfile_path?: string | null
        }
        Update: {
          address?: string | null
          amount?: number | null
          app_version?: Database["public"]["Enums"]["appVersion"] | null
          area?: number | null
          arrivalTime?: Database["public"]["Enums"]["timeSlots"] | null
          authUserId?: string | null
          billing_address?: Json | null
          captureFormat?: string | null
          created_at?: string | null
          customerID?: number | null
          customerNote?: string | null
          date?: string | null
          datePaid?: string | null
          deliverableURLs?: Json[] | null
          environment?: string | null
          extendDuration?: number | null
          id?: number
          includedDuration?: number | null
          invoiceURL?: string | null
          mapData?: Json | null
          paymentCharge_id?: string | null
          paymentID?: string | null
          pilotExpertize?: string | null
          pilotID?: number | null
          status?: string | null
          storagePlan?: Json | null
          subscriptionId?: string | null
          time_option?: Database["public"]["Enums"]["timeOptions"] | null
          zipfile_link?: string | null
          zipfile_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Orders_customerID_fkey"
            columns: ["customerID"]
            isOneToOne: false
            referencedRelation: "Customers"
            referencedColumns: ["id"]
          }
        ]
      }
      PaymentData: {
        Row: {
          created_at: string | null
          deposit: Json | null
          id: number
          includedDuration: number | null
          transferAmount_rate: number | null
          VAT: number | null
        }
        Insert: {
          created_at?: string | null
          deposit?: Json | null
          id?: number
          includedDuration?: number | null
          transferAmount_rate?: number | null
          VAT?: number | null
        }
        Update: {
          created_at?: string | null
          deposit?: Json | null
          id?: number
          includedDuration?: number | null
          transferAmount_rate?: number | null
          VAT?: number | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          companyName: string | null
          created_at: string | null
          email: string | null
          encrypted_password: string | null
          firstName: string | null
          id: number
          isAdmin: boolean
          lastName: string | null
          phoneNumber: string | null
          stripe_customer_id: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          companyName?: string | null
          created_at?: string | null
          email?: string | null
          encrypted_password?: string | null
          firstName?: string | null
          id?: number
          isAdmin?: boolean
          lastName?: string | null
          phoneNumber?: string | null
          stripe_customer_id?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          companyName?: string | null
          created_at?: string | null
          email?: string | null
          encrypted_password?: string | null
          firstName?: string | null
          id?: number
          isAdmin?: boolean
          lastName?: string | null
          phoneNumber?: string | null
          stripe_customer_id?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      appVersion: "v1" | "v2"
      timeOptions: "Any Time" | "Early" | "Afternoon" | "Choose a time slot"
      timeSlots:
        | "8am"
        | "9am"
        | "10am"
        | "11am"
        | "12pm"
        | "1pm"
        | "2pm"
        | "3pm"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
