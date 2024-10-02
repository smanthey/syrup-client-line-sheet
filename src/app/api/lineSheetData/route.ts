import { NextResponse } from 'next/server'
import { lineSheetData } from '../../../lib/lineSheetData'

export async function GET() {
  return NextResponse.json(lineSheetData)
}