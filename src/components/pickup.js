import ECS from "tnt-ecs";

export default class Pickup extends ECS.Component {

    getName() {
        return 'pickup';
    }

    getDefaults() {
        return {
            incrementValue: [],
            add: [],
            remove: []
        };
    }
}
