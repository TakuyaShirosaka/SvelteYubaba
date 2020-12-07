export interface Confirm_dispatch {
    namingClicked: {
        message: string;
    },
    nameDetermining: {
        name: string;
    };
}

export interface MyName_OneCharacter {
    char: string;
    visible: boolean;
}