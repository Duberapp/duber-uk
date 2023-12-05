import { createClient } from "@supabase/supabase-js";

const supabaseCustomerUrl = process.env.NEXT_PUBLIC_SUPABASE_CUSTOMER_URL
const supabaseCustomerKey = process.env.NEXT_PUBLIC_SUPABASE_CUSTOMER_ANON_KEY

const supabaseEmployeeUrl = process.env.NEXT_PUBLIC_SUPABASE_EMPLOYEE_URL
const supabaseEmployeeKey = process.env.NEXT_PUBLIC_SUPABASE_EMPLOYEE_ANON_KEY


export const supabaseCustomerClient = createClient(supabaseCustomerUrl, supabaseCustomerKey)

export const supabaseEmployeeClient = createClient(supabaseEmployeeUrl, supabaseEmployeeKey)
