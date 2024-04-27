export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type CustomDroneType = {
  id: number,
  brand: {
    name: string
  },
  model: string
}

export type Database = {
  public: {
    Tables: {
      DroneBrands: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      DroneEquipment: {
        Row: {
          brand: number | null
          created_at: string | null
          id: number
          model: string | null
        }
        Insert: {
          brand?: number | null
          created_at?: string | null
          id?: number
          model?: string | null
        }
        Update: {
          brand?: number | null
          created_at?: string | null
          id?: number
          model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "DroneEquipment_brand_fkey"
            columns: ["brand"]
            isOneToOne: false
            referencedRelation: "DroneBrands"
            referencedColumns: ["id"]
          }
        ]
      }
      EmployeeBilling: {
        Row: {
          bankAccountNumber: string | null
          bankBranch: string | null
          bankName: string | null
          bankSortCode: string | null
          billing_city: string | null
          billing_country: string | null
          billing_postCode: string | null
          billing_street: string | null
          companyName: string | null
          created_at: string | null
          home_city: string | null
          home_country: string | null
          home_postCode: string | null
          home_street: string | null
          id: number
          NIC: string | null
          tradeType: string | null
          userId: number
          vatNumber: string | null
        }
        Insert: {
          bankAccountNumber?: string | null
          bankBranch?: string | null
          bankName?: string | null
          bankSortCode?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postCode?: string | null
          billing_street?: string | null
          companyName?: string | null
          created_at?: string | null
          home_city?: string | null
          home_country?: string | null
          home_postCode?: string | null
          home_street?: string | null
          id?: number
          NIC?: string | null
          tradeType?: string | null
          userId: number
          vatNumber?: string | null
        }
        Update: {
          bankAccountNumber?: string | null
          bankBranch?: string | null
          bankName?: string | null
          bankSortCode?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postCode?: string | null
          billing_street?: string | null
          companyName?: string | null
          created_at?: string | null
          home_city?: string | null
          home_country?: string | null
          home_postCode?: string | null
          home_street?: string | null
          id?: number
          NIC?: string | null
          tradeType?: string | null
          userId?: number
          vatNumber?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "EmployeeBilling_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Employees"
            referencedColumns: ["id"]
          }
        ]
      }
      Employees: {
        Row: {
          accountBalance: Json[]
          approved: boolean | null
          company: string | null
          confirmNoProof: boolean | null
          created_at: string | null
          declined: boolean
          droneInsurance: string | null
          email: string | null
          firstName: string | null
          flyerID: string | null
          id: number
          lastName: string | null
          operatorID: string | null
          password: string | null
          pilot_skill: Database["public"]["Enums"]["Pilot Skill"][] | null
          profilePic: string | null
          proofDoc: string | null
          stripe_connected_id: string | null
          telNumber: string | null
          title: string | null
          userDrones: CustomDroneType[] | null
          userSkills: Json | null
        }
        Insert: {
          accountBalance?: Json[]
          approved?: boolean | null
          company?: string | null
          confirmNoProof?: boolean | null
          created_at?: string | null
          declined?: boolean
          droneInsurance?: string | null
          email?: string | null
          firstName?: string | null
          flyerID?: string | null
          id?: number
          lastName?: string | null
          operatorID?: string | null
          password?: string | null
          pilot_skill?: Database["public"]["Enums"]["Pilot Skill"][] | null
          profilePic?: string | null
          proofDoc?: string | null
          stripe_connected_id?: string | null
          telNumber?: string | null
          title?: string | null
          userDrones?: CustomDroneType[] | null
          userSkills?: Json | null
        }
        Update: {
          accountBalance?: Json[]
          approved?: boolean | null
          company?: string | null
          confirmNoProof?: boolean | null
          created_at?: string | null
          declined?: boolean
          droneInsurance?: string | null
          email?: string | null
          firstName?: string | null
          flyerID?: string | null
          id?: number
          lastName?: string | null
          operatorID?: string | null
          password?: string | null
          pilot_skill?: Database["public"]["Enums"]["Pilot Skill"][] | null
          profilePic?: string | null
          proofDoc?: string | null
          stripe_connected_id?: string | null
          telNumber?: string | null
          title?: string | null
          userDrones?: CustomDroneType[] | null
          userSkills?: Json | null
        }
        Relationships: []
      }
      Jobs: {
        Row: {
          address: string | null
          app_version: Database["public"]["Enums"]["Project Version"] | null
          area: number | null
          arrivalTime: Database["public"]["Enums"]["timeSlots"] | null
          capability: string | null
          created_at: string | null
          date: string | null
          deliverableURLs: Json[] | null
          environment: string | null
          extendDuration: number | null
          JobID: number
          payoutStatus: string | null
          pilotID: number | null
          price: number | null
          status: string | null
          time_option: Database["public"]["Enums"]["timeOptions"] | null
          transfer_id: string | null
        }
        Insert: {
          address?: string | null
          app_version?: Database["public"]["Enums"]["Project Version"] | null
          area?: number | null
          arrivalTime?: Database["public"]["Enums"]["timeSlots"] | null
          capability?: string | null
          created_at?: string | null
          date?: string | null
          deliverableURLs?: Json[] | null
          environment?: string | null
          extendDuration?: number | null
          JobID?: number
          payoutStatus?: string | null
          pilotID?: number | null
          price?: number | null
          status?: string | null
          time_option?: Database["public"]["Enums"]["timeOptions"] | null
          transfer_id?: string | null
        }
        Update: {
          address?: string | null
          app_version?: Database["public"]["Enums"]["Project Version"] | null
          area?: number | null
          arrivalTime?: Database["public"]["Enums"]["timeSlots"] | null
          capability?: string | null
          created_at?: string | null
          date?: string | null
          deliverableURLs?: Json[] | null
          environment?: string | null
          extendDuration?: number | null
          JobID?: number
          payoutStatus?: string | null
          pilotID?: number | null
          price?: number | null
          status?: string | null
          time_option?: Database["public"]["Enums"]["timeOptions"] | null
          transfer_id?: string | null
        }
        Relationships: []
      }
      NotificationTokens: {
        Row: {
          created_at: string | null
          id: number
          token: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          token?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          token?: string | null
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
      "Pilot Skill": "building_roof_inspection" | "marketing" | "social_events"
      "Project Version": "v1" | "v2"
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
