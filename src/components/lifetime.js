import ECS from "tnt-ecs";

export default class Lifetime extends ECS.Component {

    getName() {
        return 'lifetime';
    }

    getDefaults() {
        return {
            amount: 9999
        };
    }
}
