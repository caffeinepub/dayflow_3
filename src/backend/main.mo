import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Correct persistent actor field initialization
actor {
  // Persistent actor field, always up-to-date with new authorizations
  var accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  // Contact Type
  public type BirthdayContact = {
    name : Text;
    birthMonth : Nat;
    birthDay : Nat;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Map from Principal to list of BirthdayContacts
  let userContacts = Map.empty<Principal, Map.Map<Text, BirthdayContact>>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Birthday Contacts Functions
  public shared ({ caller }) func addContact(contact : BirthdayContact) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage contacts");
    };

    // Validate month and day
    if (contact.birthMonth < 1 or contact.birthMonth > 12) {
      Runtime.trap("Invalid birthMonth. Must be between 1 and 12");
    };

    if (contact.birthDay < 1 or contact.birthDay > 31) {
      Runtime.trap("Invalid birthDay. Must be between 1 and 31");
    };

    let existingContacts = switch (userContacts.get(caller)) {
      case (null) { Map.empty<Text, BirthdayContact>() };
      case (?contacts) { contacts };
    };

    existingContacts.add(contact.name, contact);
    userContacts.add(caller, existingContacts);
  };

  public shared ({ caller }) func deleteContact(contactName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage contacts");
    };

    switch (userContacts.get(caller)) {
      case (null) { Runtime.trap("No contacts found for user") };
      case (?contacts) {
        if (not contacts.containsKey(contactName)) { Runtime.trap("Contact not found") };
        contacts.remove(contactName);
        userContacts.add(caller, contacts);
      };
    };
  };

  public query ({ caller }) func listContacts() : async [BirthdayContact] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view contacts");
    };

    switch (userContacts.get(caller)) {
      case (null) { [] };
      case (?contacts) { contacts.values().toArray() };
    };
  };

  public query ({ caller }) func getAllContacts(user : Principal) : async [BirthdayContact] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view other users' contacts");
    };
    switch (userContacts.get(user)) {
      case (null) { [] };
      case (?contacts) { contacts.values().toArray() };
    };
  };
};
