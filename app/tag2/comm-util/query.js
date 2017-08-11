/**
 * Created by likuan on 8/7 0007.
 */


/*
import query from '../js/query'
const s = this;
s.mixin(query.mixin);

s.on('mount', () => {
    $('.layout',s.root).unwrap();
    s.query("** /bn").forEach(menuItem => {
        log(menuItem)
    });
});
*/

function sigmund (subject, maxSessions) {
    maxSessions = maxSessions || 10;
    var notes = [];
    var analysis = '';
    var RE = RegExp;

    function psychoAnalyze (subject, session) {
        if (session > maxSessions) return;

        if (typeof subject === 'function' ||
            typeof subject === 'undefined') {
            return;
        }

        if (typeof subject !== 'object' || !subject ||
            (subject instanceof RE)) {
            analysis += subject;
            return;
        }

        if (notes.indexOf(subject) !== -1 || session === maxSessions) return;

        notes.push(subject);
        analysis += '{';
        Object.keys(subject).forEach(function (issue, _, __) {
            // pseudo-private values.  skip those.
            if (issue.charAt(0) === '_') return;
            var to = typeof subject[issue];
            if (to === 'function' || to === 'undefined') return;
            analysis += issue;
            psychoAnalyze(subject[issue], session + 1);
        });
    }
    psychoAnalyze(subject, 0);
    return analysis;
}
function dedupe(client, hasher) {
    hasher = hasher || sigmund

    var clone = []
    var lookup = {}

    for (var i = 0; i < client.length; i++) {
        var elem = client[i]
        var hashed = hasher(elem)

        if (!lookup[hashed]) {
            clone.push(elem)
            lookup[hashed] = true
        }
    }

    return clone
}
var queryParser=(function () {

    function peg$subclass(child, parent) {
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
        this.message  = message;
        this.expected = expected;
        this.found    = found;
        this.location = location;
        this.name     = "SyntaxError";

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, peg$SyntaxError);
        }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {},
            parser  = this,

            peg$FAILED = {},

            peg$startRuleFunctions = { start: peg$parsestart },
            peg$startRuleFunction  = peg$parsestart,

            peg$c0 = function(riotQuery, domQuery) { return combineFinal(riotQuery, domQuery) },
            peg$c1 = "/",
            peg$c2 = { type: "literal", value: "/", description: "\"/\"" },
            peg$c3 = function(segment, subSegments) { return concatRepeat(segment, subSegments, 1); },
            peg$c4 = "{",
            peg$c5 = { type: "literal", value: "{", description: "\"{\"" },
            peg$c6 = "}",
            peg$c7 = { type: "literal", value: "}", description: "\"}\"" },
            peg$c8 = function(items) { return {type: "group", items: items}; },
            peg$c9 = ",",
            peg$c10 = { type: "literal", value: ",", description: "\",\"" },
            peg$c11 = function(item, subItems) { return concatRepeat(item, subItems, 1); },
            peg$c12 = "",
            peg$c13 = function() { return [{type: "empty"}]; },
            peg$c14 = /^[a-z\-]/,
            peg$c15 = { type: "class", value: "[a-z-]", description: "[a-z-]" },
            peg$c16 = function(identifier) { return {type: "identifier", value: identifier.join("")}; },
            peg$c17 = "**",
            peg$c18 = { type: "literal", value: "**", description: "\"**\"" },
            peg$c19 = function() { return {type: "wildcard"}; },
            peg$c20 = { type: "any", description: "any character" },
            peg$c21 = function(query) { return query.join(""); },
            peg$c22 = "//",
            peg$c23 = { type: "literal", value: "//", description: "\"//\"" },

            peg$currPos          = 0,
            peg$savedPos         = 0,
            peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
            peg$maxFailPos       = 0,
            peg$maxFailExpected  = [],
            peg$silentFails      = 0,

            peg$result;

        if ("startRule" in options) {
            if (!(options.startRule in peg$startRuleFunctions)) {
                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
            }

            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }

        function text() {
            return input.substring(peg$savedPos, peg$currPos);
        }

        function location() {
            return peg$computeLocation(peg$savedPos, peg$currPos);
        }

        function expected(description) {
            throw peg$buildException(
                null,
                [{ type: "other", description: description }],
                input.substring(peg$savedPos, peg$currPos),
                peg$computeLocation(peg$savedPos, peg$currPos)
            );
        }

        function error(message) {
            throw peg$buildException(
                message,
                null,
                input.substring(peg$savedPos, peg$currPos),
                peg$computeLocation(peg$savedPos, peg$currPos)
            );
        }

        function peg$computePosDetails(pos) {
            var details = peg$posDetailsCache[pos],
                p, ch;

            if (details) {
                return details;
            } else {
                p = pos - 1;
                while (!peg$posDetailsCache[p]) {
                    p--;
                }

                details = peg$posDetailsCache[p];
                details = {
                    line:   details.line,
                    column: details.column,
                    seenCR: details.seenCR
                };

                while (p < pos) {
                    ch = input.charAt(p);
                    if (ch === "\n") {
                        if (!details.seenCR) { details.line++; }
                        details.column = 1;
                        details.seenCR = false;
                    } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                        details.line++;
                        details.column = 1;
                        details.seenCR = true;
                    } else {
                        details.column++;
                        details.seenCR = false;
                    }

                    p++;
                }

                peg$posDetailsCache[pos] = details;
                return details;
            }
        }

        function peg$computeLocation(startPos, endPos) {
            var startPosDetails = peg$computePosDetails(startPos),
                endPosDetails   = peg$computePosDetails(endPos);

            return {
                start: {
                    offset: startPos,
                    line:   startPosDetails.line,
                    column: startPosDetails.column
                },
                end: {
                    offset: endPos,
                    line:   endPosDetails.line,
                    column: endPosDetails.column
                }
            };
        }

        function peg$fail(expected) {
            if (peg$currPos < peg$maxFailPos) { return; }

            if (peg$currPos > peg$maxFailPos) {
                peg$maxFailPos = peg$currPos;
                peg$maxFailExpected = [];
            }

            peg$maxFailExpected.push(expected);
        }

        function peg$buildException(message, expected, found, location) {
            function cleanupExpected(expected) {
                var i = 1;

                expected.sort(function(a, b) {
                    if (a.description < b.description) {
                        return -1;
                    } else if (a.description > b.description) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                while (i < expected.length) {
                    if (expected[i - 1] === expected[i]) {
                        expected.splice(i, 1);
                    } else {
                        i++;
                    }
                }
            }

            function buildMessage(expected, found) {
                function stringEscape(s) {
                    function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

                    return s
                        .replace(/\\/g,   '\\\\')
                        .replace(/"/g,    '\\"')
                        .replace(/\x08/g, '\\b')
                        .replace(/\t/g,   '\\t')
                        .replace(/\n/g,   '\\n')
                        .replace(/\f/g,   '\\f')
                        .replace(/\r/g,   '\\r')
                        .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
                        .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
                        .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
                        .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
                }

                var expectedDescs = new Array(expected.length),
                    expectedDesc, foundDesc, i;

                for (i = 0; i < expected.length; i++) {
                    expectedDescs[i] = expected[i].description;
                }

                expectedDesc = expected.length > 1
                    ? expectedDescs.slice(0, -1).join(", ")
                    + " or "
                    + expectedDescs[expected.length - 1]
                    : expectedDescs[0];

                foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

                return "Expected " + expectedDesc + " but " + foundDesc + " found.";
            }

            if (expected !== null) {
                cleanupExpected(expected);
            }

            return new peg$SyntaxError(
                message !== null ? message : buildMessage(expected, found),
                expected,
                found,
                location
            );
        }

        function peg$parsestart() {
            var s0, s1, s2;

            s0 = peg$currPos;
            s1 = peg$parseriotQuery();
            if (s1 === peg$FAILED) {
                s1 = null;
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsedomQuerySuffix();
                if (s2 === peg$FAILED) {
                    s2 = null;
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c0(s1, s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }

            return s0;
        }

        function peg$parseriotQuery() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$parseriotQuerySegment();
            if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 47) {
                    s4 = peg$c1;
                    peg$currPos++;
                } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c2); }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseriotQuerySegment();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 47) {
                        s4 = peg$c1;
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c2); }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseriotQuerySegment();
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c3(s1, s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }

            return s0;
        }

        function peg$parseriotQuerySegment() {
            var s0;

            s0 = peg$parseriotQuerySegmentSelector();
            if (s0 === peg$FAILED) {
                s0 = peg$parseriotQuerySegmentGroup();
            }

            return s0;
        }

        function peg$parseriotQuerySegmentGroup() {
            var s0, s1, s2, s3;

            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
                s1 = peg$c4;
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c5); }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parseriotQuerySegmentGroupItems();
                if (s2 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                        s3 = peg$c6;
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c7); }
                    }
                    if (s3 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c8(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }

            return s0;
        }

        function peg$parseriotQuerySegmentGroupItems() {
            var s0, s1, s2, s3, s4, s5;

            s0 = peg$currPos;
            s1 = peg$parseriotQuerySegmentGroupItemsItem();
            if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 44) {
                    s4 = peg$c9;
                    peg$currPos++;
                } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c10); }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseriotQuerySegmentGroupItemsItem();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s4 = peg$c9;
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c10); }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseriotQuerySegmentGroupItemsItem();
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s1, s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }

            return s0;
        }

        function peg$parseriotQuerySegmentGroupItemsItem() {
            var s0, s1;

            s0 = peg$parseriotQuery();
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$c12;
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c13();
                }
                s0 = s1;
            }

            return s0;
        }

        function peg$parseriotQuerySegmentSelector() {
            var s0;

            s0 = peg$parseriotQueryIdentifier();
            if (s0 === peg$FAILED) {
                s0 = peg$parseriotQueryWildcard();
            }

            return s0;
        }

        function peg$parseriotQueryIdentifier() {
            var s0, s1, s2;

            s0 = peg$currPos;
            s1 = [];
            if (peg$c14.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c15); }
            }
            if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (peg$c14.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c15); }
                    }
                }
            } else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c16(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parseriotQueryWildcard() {
            var s0, s1;

            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c17) {
                s1 = peg$c17;
                peg$currPos += 2;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c18); }
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c19();
            }
            s0 = s1;

            return s0;
        }

        function peg$parsedomQuery() {
            var s0, s1, s2;

            s0 = peg$currPos;
            s1 = [];
            if (input.length > peg$currPos) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c20); }
            }
            if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (input.length > peg$currPos) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c20); }
                    }
                }
            } else {
                s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s1);
            }
            s0 = s1;

            return s0;
        }

        function peg$parsedomQuerySuffix() {
            var s0, s1, s2;

            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c22) {
                s1 = peg$c22;
                peg$currPos += 2;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c23); }
            }
            if (s1 !== peg$FAILED) {
                s2 = peg$parsedomQuery();
                if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }

            return s0;
        }


        function concatRepeat(first, rest, restIndex) {
            return [first].concat(rest.map(function(item) {
                return item[restIndex];
            }));
        }

        function combineFinal(riotQuery, domQuery) {
            var resultObject = {
                riotQuery: riotQuery
            };

            if (domQuery != null) {
                resultObject.domQuery = domQuery[1];
            }

            return resultObject;
        }


        peg$result = peg$startRuleFunction();

        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
            return peg$result;
        } else {
            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                peg$fail({ type: "end", description: "end of input" });
            }

            throw peg$buildException(
                null,
                peg$maxFailExpected,
                peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
                peg$maxFailPos < input.length
                    ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                    : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
            );
        }
    }

    return {
        SyntaxError: peg$SyntaxError,
        parse:       peg$parse
    };
})();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function flattenSegmentTree(stacks, segments) {
    segments.forEach(function (segment) {
        stacks = flattenSegment(stacks, segment);
    });

    return stacks;
}

function flattenSegment(stacks, segment) {
    if (segment.type === "identifier" || segment.type === "wildcard") {
        return stacks.map(function (stack) {
            return stack.concat([segment]);
        });
    } else if (segment.type === "group") {
        var _ret = function () {
            var newStacks = [];

            segment.items.forEach(function (groupItem) {
                newStacks = newStacks.concat(flattenSegmentTree(stacks, groupItem));
            });

            return {
                v: newStacks
            };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    } else if (segment.type === "empty") {
        return stacks;
    } else {
        throw new Error("Unknown segment type '" + segment.type + "'");
    }
}
function flatten(queryTree) {
    return flattenSegmentTree([[]], queryTree);
}
function format(query) {
    return query.map(function (segment) {
        if (segment.type === "identifier") {
            return segment.value;
        } else if (segment.type === "wildcard") {
            return "**";
        } else {
            return "?";
        }
    }).join("/");
}
function tagQueries(queries) {
    var tagMap = {};
    var currentTag = 0;

    queries.forEach(function (query) {
        var stack = [];

        query.forEach(function (segment) {
            stack.push(segment);
            var formatted = format(stack);

            if (tagMap[formatted] == null) {
                tagMap[formatted] = currentTag++;
            }

            segment.tag = tagMap[formatted];
        });
    });
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function ensureArray(item) {
    if (Array.isArray(item)) {
        return item;
    } else if (item == null) {
        return [];
    } else {
        return [item];
    }
}

function recurseTags(tag) {
    var allTags = [tag];

    Object.keys(tag.tags).forEach(function (tagType) {
        ensureArray(tag.tags[tagType]).forEach(function (subTag) {
            allTags = allTags.concat(recurseTags(subTag));
        });
    });

    return allTags;
}

function createQuery(query) {
    var _queryParser$parse = queryParser.parse(query);

    var riotQuery = _queryParser$parse.riotQuery;
    var domQuery = _queryParser$parse.domQuery;

    var tagObtainer = void 0;

    if (riotQuery != null) {
        (function () {
            var flattenedQueries = flatten(riotQuery);
            tagQueries(flattenedQueries);

            tagObtainer = function tagObtainer(tag) {
                var results = [];

                flattenedQueries.forEach(function (subQuery) {
                    var lastFound = [tag];

                    subQuery.forEach(function (segment) {
                        var nextLastFound = [];

                        lastFound.forEach(function (subTag) {
                            //console.log("subtag", subQuery, segment, subTag);
                            var found = void 0;

                            if (segment.type === "identifier") {
                                found = ensureArray(subTag.tags[segment.value]);
                            } else if (segment.type === "wildcard") {
                                found = recurseTags(subTag);
                            }

                            if (found.length > 0) {
                                nextLastFound = nextLastFound.concat(found);
                            }
                        });

                        lastFound = nextLastFound;
                    });

                    results = results.concat(lastFound);
                });

                return dedupe(results, function (result) {
                    return result._riot_id;
                });
            };
        })();
    } else {
        tagObtainer = function tagObtainer(tag) {
            return [tag];
        };
    }

    return function traverse(tag) {
        var riotResults = tagObtainer(tag);

        if (domQuery == null) {
            return riotResults;
        } else {
            var _ret2 = function () {
                var domElements = [];

                riotResults.forEach(function (foundTag) {
                    domElements = domElements.concat(Array.from(foundTag.root.querySelectorAll(domQuery)));
                });

                return {
                    v: domElements
                };
            }();

            if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
        }
    };
}

var queryCache = {};

function query(tag, queryString) {
    if (queryCache[queryString] == null) {
        queryCache[queryString] = createQuery(queryString);
    }

    // TODO: DOM traversal

    return queryCache[queryString](tag);
}

query.one = function queryOne(tag, queryString) {
    var results = query(tag, queryString);

    if (results.length === 0) {
        throw new Error("No matches found for query " + queryString);
    } else {
        return results[0];
    }
};

/* For use with `riot.mixin(query.mixin)`: */
query.mixin = {
    init: function init() {
        this.query = query.bind(null, this);
        this.queryOne = query.one.bind(null, this);
    }
};

module.exports = query;