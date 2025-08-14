import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Check for environment variables at the module level.
// This is crucial. If these are not set in the Vercel project settings,
// this will throw an error during the build process, making the root cause
// of the 404 error visible in the Vercel deployment logs.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // This error will be visible in the Vercel build logs, guiding the user to the real problem.
  throw new Error("FATAL: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables must be set in Vercel project settings.");
}

// --- Type definitions duplicated from ../types.ts ---
// This ensures the serverless function is self-contained and avoids potential
// build issues with relative imports outside the /api directory on Vercel.
export enum RiskLevel {
  NONE, // Initial state
  SAFE, // Low risk
  MEDIUM_RISK, // Medium risk
  HIGH_RISK, // High risk
}

export interface StudentInfo {
  fullName: string;
  className: string;
  school: string;
  province: string;
}

export interface StudentData extends StudentInfo {
  id: string; // unique id for each submission
  score: number;
  riskLevel: RiskLevel;
  riskLevelName: string;
  timestamp: number;
}
// --- End of duplicated types ---


// --- Define Supabase types for this function to enable type-safe operations ---
interface Database {
  public: {
    Tables: {
      student_submissions: {
        Row: StudentData;
        Insert: StudentData;
        Update: Partial<StudentData>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
  };
}
// --- End of Supabase types ---


// Initialize the client once per function instance for better performance.
// By providing a generic type, we resolve the TypeScript error and enable type safety.
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const TABLE_NAME = 'student_submissions';


export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Set CORS headers to allow requests from any origin
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS pre-flight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  if (request.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*');

      if (error) {
        console.error('Supabase GET Error:', error);
        return response.status(500).json({ message: `Failed to retrieve data: ${error.message}` });
      }

      return response.status(200).json(data || []);
    } catch (error: any) {
      console.error('Handler GET Error:', error);
      return response.status(500).json({ message: 'An unexpected error occurred while fetching data.', error: error.message });
    }
  }

  if (request.method === 'POST') {
    try {
      const newSubmission = request.body as StudentData;

      // Basic validation for the incoming data
      if (!newSubmission || !newSubmission.id || !newSubmission.fullName) {
          return response.status(400).json({ message: 'Invalid submission data.' });
      }
      
      const { error } = await supabase
        .from(TABLE_NAME)
        .insert([newSubmission]);

      if (error) {
         console.error('Supabase POST Error:', error);
         return response.status(500).json({ message: `Failed to save data: ${error.message}` });
      }
      
      return response.status(201).json({ message: 'Data saved successfully.' });
    } catch (error: any) {
      console.error('Handler POST Error:', error);
      return response.status(500).json({ message: 'An unexpected error occurred while saving data.', error: error.message });
    }
  }

  // Handle unsupported HTTP methods
  response.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
  return response.status(405).end(`Method ${request.method} Not Allowed`);
}
