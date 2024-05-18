import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  JuicedReceived,
  PostCreated,
  PostUpdated,
  RevokedCreatorRole,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/VlogJuice/VlogJuice"

export function createJuicedReceivedEvent(
  cid: Bytes,
  amount: BigInt
): JuicedReceived {
  let juicedReceivedEvent = changetype<JuicedReceived>(newMockEvent())

  juicedReceivedEvent.parameters = new Array()

  juicedReceivedEvent.parameters.push(
    new ethereum.EventParam("cid", ethereum.Value.fromFixedBytes(cid))
  )
  juicedReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return juicedReceivedEvent
}

export function createPostCreatedEvent(
  postId: BigInt,
  title: string,
  hash: string
): PostCreated {
  let postCreatedEvent = changetype<PostCreated>(newMockEvent())

  postCreatedEvent.parameters = new Array()

  postCreatedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  postCreatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )

  return postCreatedEvent
}

export function createPostUpdatedEvent(
  postId: BigInt,
  title: string,
  hash: string,
  published: boolean
): PostUpdated {
  let postUpdatedEvent = changetype<PostUpdated>(newMockEvent())

  postUpdatedEvent.parameters = new Array()

  postUpdatedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromUnsignedBigInt(postId))
  )
  postUpdatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  postUpdatedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromString(hash))
  )
  postUpdatedEvent.parameters.push(
    new ethereum.EventParam("published", ethereum.Value.fromBoolean(published))
  )

  return postUpdatedEvent
}

export function createRevokedCreatorRoleEvent(
  CREATOR_ROLE: Bytes,
  account: Address
): RevokedCreatorRole {
  let revokedCreatorRoleEvent = changetype<RevokedCreatorRole>(newMockEvent())

  revokedCreatorRoleEvent.parameters = new Array()

  revokedCreatorRoleEvent.parameters.push(
    new ethereum.EventParam(
      "CREATOR_ROLE",
      ethereum.Value.fromFixedBytes(CREATOR_ROLE)
    )
  )
  revokedCreatorRoleEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return revokedCreatorRoleEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
