// src/lib/validations/obuzo-form.ts
import { z } from 'zod';

export const obuzoFormSchema = z.object({
  biz_name: z.string().min(1, { message: 'Business name is required.' }),
  biz_start_date: z.string().min(1, { message: 'Business start date/year is required.' }),
  biz_reg_status: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Business registration status is required.' }),
  }),
  biz_reg_type: z.enum(['cac', 'sta', 'coc', 'mur', 'tur', 'nrr'], {
    errorMap: () => ({ message: 'Business registration type is required.' }),
  }),
  biz_state: z.enum(['abia', 'anambra', 'ebonyi', 'enugu', 'imo'], {
    errorMap: () => ({ message: 'Business operating state is required.' }),
  }),
  biz_employee: z.enum(['1 - 10', '11 - 50', '51 - 100', '100+'], {
    errorMap: () => ({ message: 'Number of employees is required.' }),
  }),
  biz_turnover: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Turnover information is required.' }),
  }),
  biz_type: z.string().min(1, { message: 'Business type is required.' }).max(500, { message: 'Business type cannot exceed 500 characters.' }),
  biz_advert_need: z.string().min(1, { message: 'Advertising need description is required.' }).max(500, { message: 'Advertising need description cannot exceed 500 characters.' }),
  biz_advert_goals: z.string().min(1, { message: 'Advertising goals are required.' }).max(500, { message: 'Advertising goals cannot exceed 500 characters.' }),
  biz_advert_truth: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Previous advertising status is required.' }),
  }),
  biz_advert_method: z.string().max(500, { message: 'Advertising method cannot exceed 500 characters.' }).optional().or(z.literal('')), // Optional field, but if filled, max 500 chars
  biz_measure: z.string().min(1, { message: 'Impact measurement strategy is required.' }).max(500, { message: 'Impact measurement strategy cannot exceed 500 characters.' }),
  biz_contact_number: z.string().regex(/^\d{11}$/, { message: 'Phone number must be exactly 11 digits.' }),
  biz_contact_email: z.string().email({ message: 'Invalid email address.' }),
  biz_compliance: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Compliance agreement is required.' }),
  }),
  biz_certify: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'Certification is required.' }),
  }),
  biz_declaration: z.boolean().refine(val => val === true, {
    message: 'You must agree to the declaration.',
  }),
});

export type ObuzoFormValues = z.infer<typeof obuzoFormSchema>;