export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      experiments: {
        Row: {
          id: number
          created_at: string
          participant_id: string
          completed: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          participant_id: string
          completed?: boolean
        }
      }
      trials: {
        Row: {
          id: number
          experiment_id: number
          trial_number: number
          sequence_a_first_tone: number // Always 500Hz
          sequence_a_second_tone: number // 400Hz, 500Hz, or 600Hz
          sequence_a_gap_duration: number // 540ms, 600ms, or 660ms
          sequence_b_first_tone: number // Always 500Hz
          sequence_b_second_tone: number // 400Hz, 500Hz, or 600Hz
          sequence_b_gap_duration: number // 540ms, 600ms, or 660ms
          response: 'longer' | 'equal' | 'shorter'
          created_at: string
        }
        Insert: {
          id?: number
          experiment_id: number
          trial_number: number
          sequence_a_first_tone: number
          sequence_a_second_tone: number
          sequence_a_gap_duration: number
          sequence_b_first_tone: number
          sequence_b_second_tone: number
          sequence_b_gap_duration: number
          response: 'longer' | 'equal' | 'shorter'
          created_at?: string
        }
      }
    }
  }
}