# Integration state builder

## What we will cover

* One of the most boring things with integration tests
* A suggestion for making it a bit easier

## Notes

Something we need whenever we are building tests is state.

Whatever we want to test we need to create some data and then perform the operation we
want and assert that what we wanted to happen did in fact happen.

The part that is less than great is to build up the data we need in order to run our test
but there is a fairly simple way we can do this without a lot of work.
