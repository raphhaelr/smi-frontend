import { parseISO } from 'date-fns'

export const parseStringDate = (dateString: string): Date => {
  const ISODate = new Date(dateString).toISOString()
  return parseISO(ISODate)
}
