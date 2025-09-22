export interface Permission {
	id: number;
	user_id: number;
	company_id: number;
	role_id: number;
	is_deleted: boolean;
}

export interface User {
	id: number
	name: string
	email: string
}

export interface ProcessedPermission {
	id: number;
	user_id: number;
	company_code: string;
	company_name: string;
	company_active: boolean;
	role_id: number;
}

export interface Local {
	id: number
	name: string
	email: string
	token: string
	perms: ProcessedPermission[] | null
}

export interface ATG {
	id: number;
	transaction_id: string;
	tank_number: number;
	volume: number;
	tc_volume: number;
	ullage: number;
	height: number;
	water_height: number;
	temp: number;
	water_volume: number;
	date_update: string;
	location: string;
	code_company: string;
	fuel_station: string;
	data_source: string;
	created_at: string;
	full_volume: number;
	datalogger_id: string;
	tank_label: string;
	status: boolean;
}

export interface Flowmeter {
	id: number;
	transaction_id: string;
	user_id: string;
	user_name: string;
	panel_id: string;
	location: string;
	company_code: string;
	country_code: string;
	unit_number: string;
	start_time: string;
	end_time: string;
	start_totalizer: number;
	end_totalizer: number;
	volume: number;
	preset_volume: number;
	odometer: number;
	longitude: number;
	slip_number: number;
	created_at: string;
	status: boolean;
}


export interface Country {
	id: number
	alpha2: string
	alpha3: string
	name: string
}

export interface Company {
	id: number
	name: string
	code: string
	country_id: string
}


export interface ATGDevice {
	fuel_station: string
	tank_label: string
	datalogger_id: string
	location: string
}


export interface ATGStatus {
	status: string
	noUpdate: boolean
	location: string
	fuel_station: string
	tank_label: string
	datalogger_id: string
}

export interface FlowmeterDevice {
	panel_id: string
	location: string
}

export interface Role {
	id: number
	name: string
}
