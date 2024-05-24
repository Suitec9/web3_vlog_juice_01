import {
  JuicedReceived as JuicedReceivedEvent,
  PostCreated as PostCreatedEvent,
  PostUpdated as PostUpdatedEvent,
  RevokedCreatorRole as RevokedCreatorRoleEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent
} from "../generated/VlogJuice/VlogJuice"
import {
  JuicedReceived,
  Post,
  PostCreated,
  PostUpdated,
  RevokedCreatorRole,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/schema"

import { ipfs, json } from "@graphprotocol/graph-ts"

export function handleJuicedReceived(event: JuicedReceivedEvent): void {
  let entity = new JuicedReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.cid = event.params.cid
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePostCreated(event: PostCreatedEvent): void {
  let entity = new PostCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.postId = event.params.postId
  entity.title = event.params.title
  entity.hash = event.params.hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let post = new Post(event.params.postId.toString());
  post.title = event.params.title;
  post.contentHash = event.params.hash;
  let data = ipfs.cat(event.params.hash);
  if (data) {
    let value = json.fromBytes(data).toObject()
    if (value) {
      const content = value.get("content")
      if (content) {
        post.postContent = content.toString()
      }
    }
  }
  post.createdAtTimestamp = event.block.timestamp;
  post.save()
}

export function handlePostUpdated(event: PostUpdatedEvent): void {
  let entity = new PostUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.postId = event.params.postId
  entity.title = event.params.title
  entity.hash = event.params.hash
  entity.published = event.params.published

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let post = Post.load(event.params.postId.toString());
  if (post) {
    post.title = event.params.title;
    post.contentHash = event.params.hash;
    post.published = event.params.published;
    let data = ipfs.cat(event.params.hash);
    if (data) {
      let value = json.fromBytes(data).toObject()
      if (value) {
        const content = value.get('content')
        if (content) {
          post.postContent = content.toString()
        }
      }
    }
    post.updatedAtTimestamp = event.block.timestamp;
    post.save()
  }
}

export function handleRevokedCreatorRole(event: RevokedCreatorRoleEvent): void {
  let entity = new RevokedCreatorRole(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.CREATOR_ROLE = event.params.CREATOR_ROLE
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
