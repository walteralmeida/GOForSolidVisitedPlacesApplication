﻿ 
{
	metadataVersion: "1.0.5",
    
	structuralTypes: [
		{
			shortName: "GORoleDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gorole",
			dataProperties: [
				{
					name: "Description", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "DisplayName", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "Name", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "PasswordExpiry", 
					dataType: "Int32",
					isNullable: true 
				},
				{
					name: "PasswordPolicySummary", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "PasswordRegEx", 
					dataType: "String",
					isNullable: true 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "GroupRoleItems",
					isScalar: false,
					entityTypeName: "GOGroupRoleDataObject",
					associationName: "Role_GroupRoleItems"
				},				
				{
					name: "UserRoleItems",
					isScalar: false,
					entityTypeName: "GOUserRoleDataObject",
					associationName: "Role_UserRoleItems"
				},				
			]
		},
		{
			shortName: "VisitedPlaceDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "visitedplace",
			dataProperties: [
				{
					name: "CountryURI", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "Date", 
					dataType: "DateTime",
					isNullable: false 
				},
				{
					name: "Description", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Id", 
					isPartOfKey: true,
					dataType: "Guid",
					isNullable: false 
				},
				{
					name: "UserProfileUri", 
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "UserProfile",
					isScalar: true,
					foreignKeyNames: ["UserProfileUri"],
					entityTypeName: "UserProfileDataObject",
					associationName: "UserProfile_VisitedPlaceItems"
				},				
				{
					name: "Country",
					isScalar: true,
					foreignKeyNames: ["CountryURI"],
					entityTypeName: "CountryDataObject",
					associationName: "VisitedPlaceItems_Country"
				},				
			]
		},
		{
			shortName: "GOGroupRoleDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gogrouprole",
			dataProperties: [
				{
					name: "GOGroupName", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "GORoleName", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "Group",
					isScalar: true,
					foreignKeyNames: ["GOGroupName"],
					entityTypeName: "GOGroupDataObject",
					associationName: "Group_GroupRoleItems"
				},				
				{
					name: "Role",
					isScalar: true,
					foreignKeyNames: ["GORoleName"],
					entityTypeName: "GORoleDataObject",
					associationName: "Role_GroupRoleItems"
				},				
			]
		},
		{
			shortName: "PlaceDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "place",
			dataProperties: [
				{
					name: "Abstract", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Name", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "URI", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "PlaceToLocationItems",
					isScalar: false,
					entityTypeName: "PlaceToLocationDataObject",
					associationName: "Place_PlaceToLocationItems"
				},				
			]
		},
		{
			shortName: "UserProfileDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "userprofile",
			dataProperties: [
				{
					name: "Name", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "OrganizationName", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Role", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Uri", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "GOUser",
					isScalar: true,
					entityTypeName: "GOUserDataObject",
					associationName: "GOUser_UserProfile"
				},				
				{
					name: "VisitedPlaceItems",
					isScalar: false,
					entityTypeName: "VisitedPlaceDataObject",
					associationName: "UserProfile_VisitedPlaceItems"
				},				
			]
		},
		{
			shortName: "LocationDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "location",
			dataProperties: [
				{
					name: "Abstract", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Name", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "URI", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "PlaceToLocationItems",
					isScalar: false,
					entityTypeName: "PlaceToLocationDataObject",
					associationName: "Location_PlaceToLocationItems"
				},				
			]
		},
		{
			shortName: "PlaceToLocationDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "placetolocation",
			dataProperties: [
				{
					name: "LocationURI", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "PlaceURI", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "Location",
					isScalar: true,
					foreignKeyNames: ["LocationURI"],
					entityTypeName: "LocationDataObject",
					associationName: "Location_PlaceToLocationItems"
				},				
				{
					name: "Place",
					isScalar: true,
					foreignKeyNames: ["PlaceURI"],
					entityTypeName: "PlaceDataObject",
					associationName: "Place_PlaceToLocationItems"
				},				
			]
		},
		{
			shortName: "GOUserDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gouser",
			dataProperties: [
				{
					name: "Blocked", 
					dataType: "Boolean",
					isNullable: false 
				},
				{
					name: "EmailAddress", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "EmailValidated", 
					dataType: "Boolean",
					isNullable: false 
				},
				{
					name: "FirstName", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "FullName", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "Id", 
					isPartOfKey: true,
					dataType: "Guid",
					isNullable: false 
				},
				{
					name: "LastName", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Password", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "PasswordExpiry", 
					dataType: "DateTime",
					isNullable: true 
				},
				{
					name: "Unregistered", 
					dataType: "Boolean",
					isNullable: false 
				},
				{
					name: "UserName", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "UserValidated", 
					dataType: "Boolean",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "UserProfile",
					isScalar: true,
					foreignKeyNames: ["UserName"],
					entityTypeName: "UserProfileDataObject",
					associationName: "GOUser_UserProfile"
				},				
				{
					name: "UserGroupItems",
					isScalar: false,
					entityTypeName: "GOUserGroupDataObject",
					associationName: "User_UserGroupItems"
				},				
				{
					name: "UserRoleItems",
					isScalar: false,
					entityTypeName: "GOUserRoleDataObject",
					associationName: "User_UserRoleItems"
				},				
			]
		},
		{
			shortName: "GOGroupDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gogroup",
			dataProperties: [
				{
					name: "Description", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "DisplayName", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "IsSpecialGroup", 
					dataType: "Boolean",
					isNullable: false 
				},
				{
					name: "Name", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "SpecialGroup", 
					dataType: "Int16",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "GroupRoleItems",
					isScalar: false,
					entityTypeName: "GOGroupRoleDataObject",
					associationName: "Group_GroupRoleItems"
				},				
				{
					name: "UserGroupItems",
					isScalar: false,
					entityTypeName: "GOUserGroupDataObject",
					associationName: "Group_UserGroupItems"
				},				
			]
		},
		{
			shortName: "GOUserRoleDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gouserrole",
			dataProperties: [
				{
					name: "GORoleName", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "GOUserId", 
					isPartOfKey: true,
					dataType: "Guid",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "Role",
					isScalar: true,
					foreignKeyNames: ["GORoleName"],
					entityTypeName: "GORoleDataObject",
					associationName: "Role_UserRoleItems"
				},				
				{
					name: "User",
					isScalar: true,
					foreignKeyNames: ["GOUserId"],
					entityTypeName: "GOUserDataObject",
					associationName: "User_UserRoleItems"
				},				
			]
		},
		{
			shortName: "CountryDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "country",
			dataProperties: [
				{
					name: "Abstract", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Flag", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "LongName", 
					dataType: "String",
					isNullable: true 
				},
				{
					name: "Name", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "PopulationDensity", 
					dataType: "Decimal",
					isNullable: true 
				},
				{
					name: "PopulationTotal", 
					dataType: "Int64",
					isNullable: true 
				},
				{
					name: "URI", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "VisitedPlaceItems",
					isScalar: false,
					entityTypeName: "VisitedPlaceDataObject",
					associationName: "VisitedPlaceItems_Country"
				},				
			]
		},
		{
			shortName: "GOUserGroupDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gousergroup",
			dataProperties: [
				{
					name: "GOGroupName", 
					isPartOfKey: true,
					dataType: "String",
					isNullable: false 
				},
				{
					name: "GOUserId", 
					isPartOfKey: true,
					dataType: "Guid",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "KeyGenerator",
			navigationProperties: [
				{
					name: "Group",
					isScalar: true,
					foreignKeyNames: ["GOGroupName"],
					entityTypeName: "GOGroupDataObject",
					associationName: "Group_UserGroupItems"
				},				
				{
					name: "User",
					isScalar: true,
					foreignKeyNames: ["GOUserId"],
					entityTypeName: "GOUserDataObject",
					associationName: "User_UserGroupItems"
				},				
			]
		},
		{
			shortName: "GOLoginHistoryDataObject",
			namespace: "Solid.Web.Model.DataObjects",
			defaultResourceName: "gologinhistory",
			dataProperties: [
				{
					name: "Id", 
					isPartOfKey: true,
					dataType: "Int32",
					isNullable: false 
				},
				{
					name: "Info", 
					dataType: "String",
					isNullable: false 
				},
				{
					name: "Result", 
					dataType: "Boolean",
					isNullable: false 
				},
				{
					name: "Timestamp", 
					dataType: "DateTime",
					isNullable: false 
				},
				{
					name: "User", 
					dataType: "String",
					isNullable: false 
				},
			],
			autoGeneratedKeyType: "Identity",
			navigationProperties: [
			]
		},
	], 

	"resourceEntityTypeMap": {
		"GORoleDataObject": "GORole:#Solid.Web.Model.DataObjects",
		"VisitedPlaceDataObject": "VisitedPlace:#Solid.Web.Model.DataObjects",
		"GOGroupRoleDataObject": "GOGroupRole:#Solid.Web.Model.DataObjects",
		"PlaceDataObject": "Place:#Solid.Web.Model.DataObjects",
		"UserProfileDataObject": "UserProfile:#Solid.Web.Model.DataObjects",
		"LocationDataObject": "Location:#Solid.Web.Model.DataObjects",
		"PlaceToLocationDataObject": "PlaceToLocation:#Solid.Web.Model.DataObjects",
		"GOUserDataObject": "GOUser:#Solid.Web.Model.DataObjects",
		"GOGroupDataObject": "GOGroup:#Solid.Web.Model.DataObjects",
		"GOUserRoleDataObject": "GOUserRole:#Solid.Web.Model.DataObjects",
		"CountryDataObject": "Country:#Solid.Web.Model.DataObjects",
		"GOUserGroupDataObject": "GOUserGroup:#Solid.Web.Model.DataObjects",
		"GOLoginHistoryDataObject": "GOLoginHistory:#Solid.Web.Model.DataObjects",
	}
}

