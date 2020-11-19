const splitCustom = (str, separator, limit) => {
    str = str.split(separator);

    if(str.length > limit) {
        let ret = str.splice(0, limit);
        ret.push(str.join(separator));

        return ret;
    }

    return str;
}

export class Compiler {
    static compile(m, prog = '') {
        let ligneCount = 0;

        try {
            const lines = prog.split('\n');

            let currentState = null;

            for(const l of lines) {
                ligneCount++;
                const trimed = l.trim();
                if(trimed == '' || (trimed.length >= 2 && trimed.charAt(0) == '-' && trimed.charAt(1) == '-')) continue;

                const s = splitCustom(trimed.replace(/ +(?= )/g, ''), ' ', 1);

                if(currentState != null) {
                    if(Compiler.keywords.includes(s[0])) {
                        m.addState(currentState);
                        currentState = null;
                    } else {
                        const lState = s.join('').replace(/(\s+)/g, '');
                        const splitted = lState.split('=>');

                        if(splitted.length < 2) throw `Mauvaise description de l'état`;

                        const condition = splitted[0];

                        const actions = splitted[1].substring(splitted[1].lastIndexOf('[') + 1, splitted[1].lastIndexOf(']')).split(',');

                        if(actions.length > 0 && (actions[0] == '' || actions[0] == '[')) throw `Mauvaise description de l'état`;

                        currentState[condition] = {};

                        if(actions[0]) currentState[condition].nextState = actions[0];
                        if(actions[1]) currentState[condition].newValue = actions[1];
                        if(actions[2]) currentState[condition].direction = actions[2];

                        continue;
                    }
                }

                switch (s[0]) {
                    case 'def':
                        if(s.length < 2) throw `'def' -> L'état n'a pas de nom`;
                        currentState = {_name_: s[1]}
                        break;

                    case 'blank':
                        if(s.length < 2) throw `'blank' -> L'état n'a pas de nom`;
                        m.setBlank(s[1]);
                        break;
                    
                    case 'input':
                        if(s.length < 2) throw `'input' -> Aucune entrée`;

                        let input = s[1].replace(/(\s+)/g, '');
                        input = input.substring(input.lastIndexOf('[') + 1, input.lastIndexOf(']')).split(',').filter(e => !!e);
                        m.setInput(input);
                        break;
                    
                    case 'start':
                        if(s.length < 2) throw `'start' -> L'état n'a pas de nom`;
                        m.setStart(s[1]);
                        break;
                
                    default:
                        throw `Jeton inconnu -> ${s[0]}`;
                }
            }

            if(m.getBlank() == null) throw `'blank' n'est pas défini`;
            if(m.getStart() == null) throw `'start' n'est pas défini`;

        } catch (error) {
            throw `Ligne ${ligneCount} : ${error}`;
        }
    }
}

Compiler.keywords = ['def', 'blank', 'input', 'start'];
Compiler.spe = ['=>'];
