import test from "node:test";
import assert from "node:assert/strict";
import {isValidUrl} from "./validation.js";
test("accepts web URLs",()=>assert.equal(isValidUrl("https://example.com/path"),true));
test("rejects unsafe protocols",()=>{for(const u of ["javascript:alert(1)","file:///etc/passwd","ftp://example.com","not a url"])assert.equal(isValidUrl(u),false)});
test("rejects embedded credentials",()=>assert.equal(isValidUrl("https://user:pass@example.com"),false));
