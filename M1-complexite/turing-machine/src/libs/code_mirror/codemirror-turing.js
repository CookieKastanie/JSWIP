module.exports = CodeMirror => {
    CodeMirror.defineSimpleMode('turing', {
        start: [
            {
                regex: /(?:def|blank|input|start)\b/,
                token: 'keyword'
            },

            {
                regex: /=>/, token: 'builtin'
            },

            {
                regex: /--.*/, token: 'comment'
            },
        ]
    });
}
