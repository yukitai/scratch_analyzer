import { ScratchBlock } from "./sb3json"

const shadow = false

export const injection_json: any = {
    "blocks": {
        "scratch_analyzer_injected_d": {
            "opcode": "procedures_definition",
            "next": "scratch_analyzer_injected_e",
            "parent": null,
            "inputs": {
                "custom_block": [
                    1,
                    "scratch_analyzer_injected_f"
                ]
            },
            "fields": {},
            "shadow": shadow,
            "topLevel": true,
            "scratch_analyzer_injected_x": -45,
            "scratch_analyzer_injected_y": -787
        },
        "scratch_analyzer_injected_f": {
            "opcode": "procedures_prototype",
            "next": null,
            "parent": "scratch_analyzer_injected_d",
            "inputs": {
                "AgxUbSMH6VM|WE[)e-uH": [
                    1,
                    "scratch_analyzer_injected_o"
                ]
            },
            "fields": {},
            "shadow": true,
            "topLevel": false,
            "mutation": {
                "tagName": "mutation",
                "children": [],
                "proccode": "36f8hj43a_mark %s",
                "argumentids": "[\"AgxUbSMH6VM|WE[)e-uH\"]",
                "argumentnames": "[\"n\"]",
                "argumentdefaults": "[\"\"]",
                "warp": "true"
            }
        },
        "scratch_analyzer_injected_o": {
            "opcode": "argument_reporter_string_number",
            "next": null,
            "parent": "scratch_analyzer_injected_f",
            "inputs": {},
            "fields": {
                "VALUE": [
                    "n",
                    null
                ]
            },
            "shadow": true,
            "topLevel": false
        },
        "scratch_analyzer_injected_a": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_g",
            "parent": "scratch_analyzer_injected_e",
            "inputs": {
                "ITEM": [
                    3,
                    "scratch_analyzer_injected_p",
                    [
                        10,
                        "thing"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_p": {
            "opcode": "argument_reporter_string_number",
            "next": null,
            "parent": "scratch_analyzer_injected_a",
            "inputs": {},
            "fields": {
                "VALUE": [
                    "n",
                    null
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_e": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_a",
            "parent": "scratch_analyzer_injected_d",
            "inputs": {
                "ITEM": [
                    1,
                    [
                        10,
                        "start"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_g": {
            "opcode": "data_addtolist",
            "next": null,
            "parent": "scratch_analyzer_injected_a",
            "inputs": {
                "ITEM": [
                    3,
                    "scratch_analyzer_injected_r",
                    [
                        10,
                        "thing"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_r": {
            "opcode": "sensing_dayssince2000",
            "next": null,
            "parent": "scratch_analyzer_injected_g",
            "inputs": {},
            "fields": {},
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_j": {
            "opcode": "procedures_definition",
            "next": "scratch_analyzer_injected_k",
            "parent": null,
            "inputs": {
                "custom_block": [
                    1,
                    "scratch_analyzer_injected_l"
                ]
            },
            "fields": {},
            "shadow": shadow,
            "topLevel": true,
            "scratch_analyzer_injected_x": -46,
            "scratch_analyzer_injected_y": -466
        },
        "scratch_analyzer_injected_l": {
            "opcode": "procedures_prototype",
            "next": null,
            "parent": "scratch_analyzer_injected_j",
            "inputs": {
                "b@7k^nXe-$2*!)3^keOm": [
                    1,
                    "scratch_analyzer_injected_s"
                ]
            },
            "fields": {},
            "shadow": true,
            "topLevel": false,
            "mutation": {
                "tagName": "mutation",
                "children": [],
                "proccode": "36f8hj43a_unmark %s",
                "argumentids": "[\"b@7k^nXe-$2*!)3^keOm\"]",
                "argumentnames": "[\"n\"]",
                "argumentdefaults": "[\"\"]",
                "warp": "true"
            }
        },
        "scratch_analyzer_injected_s": {
            "opcode": "argument_reporter_string_number",
            "next": null,
            "parent": "scratch_analyzer_injected_l",
            "inputs": {},
            "fields": {
                "VALUE": [
                    "n",
                    null
                ]
            },
            "shadow": true,
            "topLevel": false
        },
        "scratch_analyzer_injected_k": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_b",
            "parent": "scratch_analyzer_injected_j",
            "inputs": {
                "ITEM": [
                    1,
                    [
                        10,
                        "end"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_b": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_m",
            "parent": "scratch_analyzer_injected_k",
            "inputs": {
                "ITEM": [
                    3,
                    "scratch_analyzer_injected_t",
                    [
                        10,
                        "thing"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_t": {
            "opcode": "argument_reporter_string_number",
            "next": null,
            "parent": "scratch_analyzer_injected_b",
            "inputs": {},
            "fields": {
                "VALUE": [
                    "n",
                    null
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_m": {
            "opcode": "data_addtolist",
            "next": null,
            "parent": "scratch_analyzer_injected_b",
            "inputs": {
                "ITEM": [
                    3,
                    "scratch_analyzer_injected_u",
                    [
                        10,
                        "thing"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_u": {
            "opcode": "sensing_dayssince2000",
            "next": null,
            "parent": "scratch_analyzer_injected_m",
            "inputs": {},
            "fields": {},
            "shadow": shadow,
            "topLevel": false
        },
    }
}

export const injection_stage: any = {
    blocks: {
        "scratch_analyzer_injected_q": {
            "opcode": "event_whenflagclicked",
            "next": "scratch_analyzer_injected_h",
            "parent": null,
            "inputs": {},
            "fields": {},
            "shadow": shadow,
            "topLevel": true,
            "scratch_analyzer_injected_x": -49,
            "scratch_analyzer_injected_y": -1192
        },
        "scratch_analyzer_injected_h": {
            "opcode": "data_deletealloflist",
            "next": "scratch_analyzer_injected_i",
            "parent": "scratch_analyzer_injected_q",
            "inputs": {},
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_i": {
            "opcode": "control_forever",
            "next": null,
            "parent": "scratch_analyzer_injected_h",
            "inputs": {
                "SUBSTACK": [
                    2,
                    "scratch_analyzer_injected_n"
                ]
            },
            "fields": {},
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_n": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_c",
            "parent": "scratch_analyzer_injected_i",
            "inputs": {
                "ITEM": [
                    1,
                    [
                        10,
                        "tick"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_c": {
            "opcode": "data_addtolist",
            "next": "scratch_analyzer_injected_v",
            "parent": "scratch_analyzer_injected_n",
            "inputs": {
                "ITEM": [
                    3,
                    "scratch_analyzer_injected_w",
                    [
                        10,
                        "thing"
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        "scratch_analyzer_injected_v": {
            "opcode": "data_addtolist",
            "next": null,
            "parent": "scratch_analyzer_injected_c",
            "inputs": {
                "ITEM": [
                    1,
                    [
                        10,
                        ""
                    ]
                ]
            },
            "fields": {
                "LIST": [
                    "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
                    "wVRq*^~#2T`usdQf9C;/"
                ]
            },
            "shadow": shadow,
            "topLevel": false
        },
        /*"scratch_analyzer_injected_x": {
            "opcode": "control_wait",
            "next": null,
            "parent": "scratch_analyzer_injected_v",
            "inputs": {
                "DURATION": [
                    1,
                    [
                        5,
                        "0"
                    ]
                ]
            },
            "fields": {},
            "shadow": shadow,
            "topLevel": false
        },*/
        "scratch_analyzer_injected_w": {
            "opcode": "sensing_dayssince2000",
            "next": null,
            "parent": "scratch_analyzer_injected_c",
            "inputs": {},
            "fields": {},
            "shadow": shadow,
            "topLevel": false
        },
    }
}

export function inject_call_mark(arg: string, parent?: string | null, next?: string | null): ScratchBlock {
    return {
        "opcode": "procedures_call",
        "next": next ?? null,
        "parent": parent ?? null,
        "inputs": {
            "AgxUbSMH6VM|WE[)e-uH": [
                1,
                [
                    10,
                    arg
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false,
        "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "36f8hj43a_mark %s",
            "argumentids": "[\"AgxUbSMH6VM|WE[)e-uH\"]",
            "warp": "true"
        }
    } as ScratchBlock
}

export function inject_call_unmark(arg: string, parent?: string | null, next?: string | null): ScratchBlock {
    return {
        "opcode": "procedures_call",
        "next": next ?? null,
        "parent": parent ?? null,
        "inputs": {
            "b@7k^nXe-$2*!)3^keOm": [
                1,
                [
                    10,
                    arg
                ]
            ]
        },
        "fields": {},
        "shadow": false,
        "topLevel": false,
        "mutation": {
            "tagName": "mutation",
            "children": [],
            "proccode": "36f8hj43a_unmark %s",
            "argumentids": "[\"b@7k^nXe-$2*!)3^keOm\"]",
            "warp": "true"
        }
    } as ScratchBlock
}

export const injection_list_delc: any = {
    "wVRq*^~#2T`usdQf9C;/": [
        "$A1H6D24JT563_SCRATCH_ANALYZER_SPEED_TEST",
        []
    ]
}