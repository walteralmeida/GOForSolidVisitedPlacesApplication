﻿////////////////////////////////////////////////////////////////////////////////////////////
// This is Generated Code
// You should not modify this code as it may be overwritten. Use Partial classes instead
// Generated By Generative Objects  
//////////////////////////////////////////////////////////////////////////////////////////// 
using System;

namespace Solid.Data
{
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: Country.</summary>
	public enum CountryFieldIndex
	{
		///<summary>PopulationDensity. </summary>
		PopulationDensity,
		///<summary>PopulationTotal. </summary>
		PopulationTotal,
		///<summary>URI. </summary>
		URI,
		///<summary>LongName. </summary>
		LongName,
		///<summary>Name. </summary>
		Name,
		///<summary>Abstract. </summary>
		Abstract,
		///<summary>Flag. </summary>
		Flag,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOGroup.</summary>
	public enum GOGroupFieldIndex
	{
		///<summary>DisplayName. </summary>
		DisplayName,
		///<summary>Name. </summary>
		Name,
		///<summary>Description. </summary>
		Description,
		///<summary>IsSpecialGroup. </summary>
		IsSpecialGroup,
		///<summary>SpecialGroup. </summary>
		SpecialGroup,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOGroupRole.</summary>
	public enum GOGroupRoleFieldIndex
	{
		///<summary>GOGroupName. </summary>
		GOGroupName,
		///<summary>GORoleName. </summary>
		GORoleName,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOLoginHistory.</summary>
	public enum GOLoginHistoryFieldIndex
	{
		///<summary>Id. </summary>
		Id,
		///<summary>Info. </summary>
		Info,
		///<summary>User. </summary>
		User,
		///<summary>Timestamp. </summary>
		Timestamp,
		///<summary>Result. </summary>
		Result,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GORole.</summary>
	public enum GORoleFieldIndex
	{
		///<summary>PasswordExpiry. </summary>
		PasswordExpiry,
		///<summary>Description. </summary>
		Description,
		///<summary>PasswordRegEx. </summary>
		PasswordRegEx,
		///<summary>DisplayName. </summary>
		DisplayName,
		///<summary>PasswordPolicySummary. </summary>
		PasswordPolicySummary,
		///<summary>Name. </summary>
		Name,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOUser.</summary>
	public enum GOUserFieldIndex
	{
		///<summary>Id. </summary>
		Id,
		///<summary>EmailAddress. </summary>
		EmailAddress,
		///<summary>UserName. </summary>
		UserName,
		///<summary>FullName. </summary>
		FullName,
		///<summary>LastName. </summary>
		LastName,
		///<summary>Password. </summary>
		Password,
		///<summary>FirstName. </summary>
		FirstName,
		///<summary>PasswordExpiry. </summary>
		PasswordExpiry,
		///<summary>Unregistered. </summary>
		Unregistered,
		///<summary>EmailValidated. </summary>
		EmailValidated,
		///<summary>Blocked. </summary>
		Blocked,
		///<summary>UserValidated. </summary>
		UserValidated,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOUserGroup.</summary>
	public enum GOUserGroupFieldIndex
	{
		///<summary>GOUserId. </summary>
		GOUserId,
		///<summary>GOGroupName. </summary>
		GOGroupName,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: GOUserRole.</summary>
	public enum GOUserRoleFieldIndex
	{
		///<summary>GOUserId. </summary>
		GOUserId,
		///<summary>GORoleName. </summary>
		GORoleName,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: Location.</summary>
	public enum LocationFieldIndex
	{
		///<summary>URI. </summary>
		URI,
		///<summary>CountryURI. </summary>
		CountryURI,
		///<summary>Abstract. </summary>
		Abstract,
		///<summary>Name. </summary>
		Name,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: Place.</summary>
	public enum PlaceFieldIndex
	{
		///<summary>Abstract. </summary>
		Abstract,
		///<summary>Name. </summary>
		Name,
		///<summary>URI. </summary>
		URI,
		///<summary>CountryURI. </summary>
		CountryURI,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: PlaceToLocation.</summary>
	public enum PlaceToLocationFieldIndex
	{
		///<summary>LocationURI. </summary>
		LocationURI,
		///<summary>PlaceURI. </summary>
		PlaceURI,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: UserProfile.</summary>
	public enum UserProfileFieldIndex
	{
		///<summary>Uri. </summary>
		Uri,
		/// <summary></summary>
		AmountOfFields
	}
	/// <summary>Index enum to fast-access EntityFields in the IEntityFields collection for the entity: VisitedPlace.</summary>
	public enum VisitedPlaceFieldIndex
	{
		///<summary>Id. </summary>
		Id,
		///<summary>UserProfileUri. </summary>
		UserProfileUri,
		///<summary>Description. </summary>
		Description,
		///<summary>CountryURI. </summary>
		CountryURI,
		///<summary>Date. </summary>
		Date,
		/// <summary></summary>
		AmountOfFields
	}

	/// <summary>Enum definition for all the entity types defined in this namespace. Used by the entityfields factory.</summary>
	public enum EntityType
	{
		///<summary>Country</summary>
		CountryEntity,
		///<summary>GOGroup</summary>
		GOGroupEntity,
		///<summary>GOGroupRole</summary>
		GOGroupRoleEntity,
		///<summary>GOLoginHistory</summary>
		GOLoginHistoryEntity,
		///<summary>GORole</summary>
		GORoleEntity,
		///<summary>GOUser</summary>
		GOUserEntity,
		///<summary>GOUserGroup</summary>
		GOUserGroupEntity,
		///<summary>GOUserRole</summary>
		GOUserRoleEntity,
		///<summary>Location</summary>
		LocationEntity,
		///<summary>Place</summary>
		PlaceEntity,
		///<summary>PlaceToLocation</summary>
		PlaceToLocationEntity,
		///<summary>UserProfile</summary>
		UserProfileEntity,
		///<summary>VisitedPlace</summary>
		VisitedPlaceEntity,
	}
}