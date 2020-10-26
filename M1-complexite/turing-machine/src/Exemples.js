import { Editor } from "./Editor";

export class Exemples {
    static loadInvBin() {
        Editor.setValue(`-- Inverse les 0 et les 1
def q0
    0 => [q0, 1, >]
    1 => [q0, 0, >]
    B => [qf]

blank B
input [0, 0, 1, 0]
start q0
`);
    }

    static loadAddBin() {
        Editor.setValue(`-- Incrémentation binaire (+1)
def q0  
    0 => [q0, 0, >]
    1 => [q0, 1, >]
    B => [q1, B, <]

def q1
    0 => [qf, 1]
    1 => [q1, 0, <]
    B => [qf, 1]

blank B
input [0, 0, 0, 1, 0, 0, 1, 1, 1]
start q0
`);
    }

    static loadSubBin() {
        Editor.setValue(`-- Décrémentation binaire (-1)
def q0  
    0 => [q0, 0, >]
    1 => [q0, 1, >]
    B => [q1, B, <]

def q1
    0 => [q1, 1, <]
    1 => [qf, 0]
    B => [qf]

blank B
input [0, 0, 0, 1, 0, 0, 1, 1, 0]
start q0
`);
    }
}
