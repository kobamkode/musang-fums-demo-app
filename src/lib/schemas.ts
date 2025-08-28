import { z } from "zod/v4";

export const companySchema = z.object({
	"id": z.number(),
	"code": z.string(),
	"name": z.string(),
	"country_id": z.string()
});

export type CompanySchema = typeof companySchema


export const atgSchema = z.object({
	"id": z.number(),
	"transaction_id": z.string(),
	"tank_number": z.number(),
	"volume": z.number(),
	"tc_volume": z.number(),
	"ullage": z.number(),
	"height": z.number(),
	"water_height": z.number(),
	"temp": z.number(),
	"water_volume": z.number(),
	"date_update": z.coerce.date(),
	"location": z.string(),
	"code_company": z.string(),
	"fuel_station": z.string(),
	"data_source": z.string(),
	"created_at": z.coerce.date(),
	"full_volume": z.number(),
	"datalogger_id": z.string(),
	"tank_label": z.string(),
	"status": z.boolean(),
});

export type AtgSchema = typeof atgSchema


export const permissionSchema = z.object({
	user_id: z.string(),
	company_id: z.string(),
	role_id: z.string(),
});

export type PermissionSchema = typeof permissionSchema

export const userSchema = z.object({
	"id": z.number(),
	"name": z.string(),
	"email": z.string(),
	"password": z.string(),
});

export const editUserSchema = z.object({
	"id": z.number(),
	"name": z.string(),
	"email": z.string(),
});

export type UserSchema = typeof userSchema
export type EditUserSchema = typeof editUserSchema


export const roleSchema = z.object({
	"id": z.number(),
	"name": z.string(),
});

export type RoleSchema = typeof roleSchema
