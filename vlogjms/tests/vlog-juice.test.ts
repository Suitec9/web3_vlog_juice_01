import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { JuicedReceived } from "../generated/schema"
import { JuicedReceived as JuicedReceivedEvent } from "../generated/VlogJuice/VlogJuice"
import { handleJuicedReceived } from "../src/vlog-juice"
import { createJuicedReceivedEvent } from "./vlog-juice-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let cid = Bytes.fromI32(1234567890)
    let amount = BigInt.fromI32(234)
    let newJuicedReceivedEvent = createJuicedReceivedEvent(cid, amount)
    handleJuicedReceived(newJuicedReceivedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("JuicedReceived created and stored", () => {
    assert.entityCount("JuicedReceived", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "JuicedReceived",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cid",
      "1234567890"
    )
    assert.fieldEquals(
      "JuicedReceived",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
