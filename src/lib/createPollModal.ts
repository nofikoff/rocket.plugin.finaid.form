import {IModify, IPersistence} from '@rocket.chat/apps-engine/definition/accessors';
import {RocketChatAssociationModel, RocketChatAssociationRecord} from '@rocket.chat/apps-engine/definition/metadata';
import {IUIKitModalViewParam} from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';

import {uuid} from './uuid';

export async function createPollModal({id = '', question, persistence, data, modify, options = 2}: {
    id?: string,
    question?: string,
    persistence: IPersistence,
    data,
    modify: IModify,
    options?: number,
}): Promise<IUIKitModalViewParam> {
    const viewId = id || uuid();

    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, viewId);
    await persistence.createWithAssociation({room: data.room}, association);

    const block = modify.getCreator().getBlockBuilder();


    // block.addInputBlock({
    //     blockId: 'poll',
    //     element: block.newPlainTextInputElement({initialValue: question, actionId: 'question'}),
    //     label: block.newPlainTextObject('Ваша фамилия'),
    // });

//    .addDividerBlock();


    // for (let i = 0; i < options; i++) {
    //     block.addInputBlock({
    //         blockId: 'poll',
    //         optional: true,
    //         element: block.newPlainTextInputElement({
    //             actionId: `option-${i}`,
    //             placeholder: block.newPlainTextObject('Insert an option'),
    //         }),
    //         label: block.newPlainTextObject(''),
    //     });
    // }

    // block
    //     .addActionsBlock({
    //         blockId: 'config',
    //         elements: [
    //             block.newStaticSelectElement({
    //                 placeholder: block.newPlainTextObject('Multiple choices'),
    //                 actionId: 'mode',
    //                 initialValue: 'multiple',
    //                 options: [
    //                     {
    //                         text: block.newPlainTextObject('Multiple choices'),
    //                         value: 'multiple',
    //                     },
    //                     {
    //                         text: block.newPlainTextObject('Single choice'),
    //                         value: 'single',
    //                     },
    //                 ],
    //             }),
    //
    //             block.newButtonElement({
    //                 actionId: 'addChoice',
    //                 text: block.newPlainTextObject('Add a choice'),
    //                 value: String(options + 1),
    //             }),
    //
    //             block.newStaticSelectElement({
    //                 placeholder: block.newPlainTextObject('Open vote'),
    //                 actionId: 'visibility',
    //                 initialValue: 'open',
    //                 options: [
    //                     {
    //                         text: block.newPlainTextObject('Open vote'),
    //                         value: 'open',
    //                     },
    //                     {
    //                         text: block.newPlainTextObject('Confidential vote'),
    //                         value: 'confidential',
    //                     },
    //                 ],
    //             }),
    //         ],
    //     });


    block.addActionsBlock({
        blockId: 'hutitle',
        elements: [
            block.newStaticSelectElement({

                placeholder: block.newPlainTextObject('Заголовок'),
                actionId: 'hutitle',
                initialValue: '',
                options: [
                    {
                        text: block.newPlainTextObject('Финпомощь при рождении ребенка'),
                        value: 'bornChild',
                    },
                    {
                        text: block.newPlainTextObject('Финпомощь при болезни'),
                        value: 'disease',
                    },
                    {
                        text: block.newPlainTextObject('Смерть'),
                        value: 'die',
                    },
                    {
                        text: block.newPlainTextObject('Прочее'),
                        value: 'any',
                    },
                ],
            }),


        ],
    });


    block.addInputBlock({
        blockId: 'pdf_desc',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_desc',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Содержание'),
    });

    block.addInputBlock({
        blockId: 'pdf_phone',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_phone',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Номер телефона'),
    });

    block.addInputBlock({
        blockId: 'pdf_passport_seria',
        element: block.newPlainTextInputElement({
            actionId: `pdf_passport_seria`,
            placeholder: block.newPlainTextObject('Серия'),
        }),
        label: block.newPlainTextObject('Паспорт'),
    });

    block.addInputBlock({
        blockId: 'pdf_passport_code',
        element: block.newPlainTextInputElement({
            actionId: `pdf_passport_code`,
            placeholder: block.newPlainTextObject('Номер'),
        }),
        label: block.newPlainTextObject(''),
    });

    block.addInputBlock({
        blockId: 'pdf_extradited',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_extradited',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Выдан'),
    });

    block.addInputBlock({
        blockId: 'pdf_identification',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_identification',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Идентификационный код'),
    });

    block.addInputBlock({
        blockId: 'pdf_card',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_card',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Карточный счет'),
    });

    block.addInputBlock({
        blockId: 'pdf_bank',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_bank',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Банк'),
    });

    block.addInputBlock({
        blockId: 'pdf_rr',
        element: block.newPlainTextInputElement({
            actionId: 'pdf_rr',
            placeholder: block.newPlainTextObject(''),
        }),
        label: block.newPlainTextObject('Расчетный счет'),
    });

    block.addInputBlock({
        blockId: 'pdf_mfo',
        element: block.newPlainTextInputElement({
            actionId: `pdf_mfo`,
            placeholder: block.newPlainTextObject('МФО'),
        }),
        label: block.newPlainTextObject(''),
    });

    block.addInputBlock({
        blockId: 'pdf_edrpoy',
        element: block.newPlainTextInputElement({
            actionId: `pdf_edrpoy`,
            placeholder: block.newPlainTextObject('ЭДРПОУ'),
        }),
        label: block.newPlainTextObject(''),
    });


    return {
        id: viewId,

        title: block.newPlainTextObject('Заявка на получение финпомощи'),

        submit: block.newButtonElement({
            text: block.newPlainTextObject('Create'),
        }),

        close: block.newButtonElement({
            text: block.newPlainTextObject('Dismiss'),
        }),

        blocks: block.getBlocks(),
    };
}




