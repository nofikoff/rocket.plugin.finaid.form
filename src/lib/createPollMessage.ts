import {IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {RocketChatAssociationModel, RocketChatAssociationRecord} from '@rocket.chat/apps-engine/definition/metadata';
import {IRoom} from '@rocket.chat/apps-engine/definition/rooms';
import {
    IUIKitViewSubmitIncomingInteraction,
} from '@rocket.chat/apps-engine/definition/uikit/UIKitIncomingInteractionTypes';
import {IPoll} from '../IPoll';
import {createPollBlocks} from './createPollBlocks';

// by Novikov
import {
    IHttp
} from '@rocket.chat/apps-engine/definition/accessors';


export async function createPollMessage(
    data: IUIKitViewSubmitIncomingInteraction,
    read: IRead,
    modify: IModify,
    persistence: IPersistence,
    uid: string,
    // by Novikov add http
    http: IHttp
) {
    const {view: {id}} = data;
    const {state}: {
        state?: any;
    } = data.view;

    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, id);
    const [record] = await read.getPersistenceReader().readByAssociation(association) as Array<{
        room: IRoom;
    }>;

    // if (!state.poll || !state.poll.question || state.poll.question.trim() === '') {
    //     throw {question: 'Please type your question here'};
    // }

    // const options = Object.entries<any>(state.poll || {})
    //     .filter(([key]) => key !== 'question')
    //     .map(([, option]) => option)
    //     .filter((option) => option.trim() !== '');
    //
    // if (!options.length) {
    //     throw {
    //         'option-0': 'Please provide some options',
    //         'option-1': 'Please provide some options',
    //     };
    // }

    // if (options.length === 1) {
    //     if (!state.poll['option-0'] || state.poll['option-0'] === '') {
    //         throw {
    //             'option-0': 'Please provide one more option',
    //         };
    //     }
    //     if (!state.poll['option-1'] || state.poll['option-1'] === '') {
    //         throw {
    //             'option-1': 'Please provide one more option',
    //         };
    //     }
    // }


    if (!state.hutitle || !state.hutitle.hutitle || state.hutitle.hutitle.trim() === '') {
        throw {hutitle: 'Please type your subject here'};
    }

    if (!state.pdf_desc || !state.pdf_desc.pdf_desc || state.pdf_desc.pdf_desc.trim() === '') {
        throw {pdf_desc: 'Please type your description here'};
    }
    if (!state.pdf_phone || !state.pdf_phone.pdf_phone || state.pdf_phone.pdf_phone.trim() === '') {
        throw {pdf_phone: 'Please type your phone number here'};
    }
    if (!state.pdf_passport_seria || !state.pdf_passport_seria.pdf_passport_seria || state.pdf_passport_seria.pdf_passport_seria.trim() === '') {
        throw {pdf_passport_seria: 'Please type your passport`s series here'};
    }
    if (!state.pdf_passport_code || !state.pdf_passport_code.pdf_passport_code || state.pdf_passport_code.pdf_passport_code.trim() === '') {
        throw {pdf_passport_code: 'Please type your passport`s code here'};
    }
    if (!state.pdf_extradited || !state.pdf_extradited.pdf_extradited || state.pdf_extradited.pdf_extradited.trim() === '') {
        throw {pdf_extradited: 'Please type your extradited here'};
    }
    if (!state.pdf_identification || !state.pdf_identification.pdf_identification || state.pdf_identification.pdf_identification.trim() === '') {
        throw {pdf_identification: 'Please type your identification here'};
    }
    if (!state.pdf_card || !state.pdf_card.pdf_card || state.pdf_card.pdf_card.trim() === '') {
        throw {pdf_card: 'Please type your card here'};
    }
    if (!state.pdf_bank || !state.pdf_bank.pdf_bank || state.pdf_bank.pdf_bank.trim() === '') {
        throw {pdf_bank: 'Please type your bank here'};
    }
    if (!state.pdf_rr || !state.pdf_rr.pdf_rr || state.pdf_rr.pdf_rr.trim() === '') {
        throw {pdf_rr: 'Please type your checking account here'};
    }
    if (!state.pdf_mfo || !state.pdf_mfo.pdf_mfo || state.pdf_mfo.pdf_mfo.trim() === '') {
        throw {pdf_mfo: 'Please type your MFO here'};
    }
    if (!state.pdf_edrpoy || !state.pdf_edrpoy.pdf_edrpoy || state.pdf_edrpoy.pdf_edrpoy.trim() === '') {
        throw {pdf_edrpoy: 'Please type your EDRPOY here'};
    }

    try {
        // const {config = {mode: 'multiple', visibility: 'open'}} = state;
        // const {mode = 'multiple', visibility = 'open'} = config;

        const showNames = await read.getEnvironmentReader().getSettings().getById('use-user-name');


        const builder = modify.getCreator().startMessage()
            .setUsernameAlias((showNames.value && data.user.name) || data.user.username)
            .setRoom(record.room);
        //.setText(state.poll.question);

        // const poll: IPoll = {
        //     question: state.poll.question,
        //     uid,
        //     msgId: '',
        //     options,
        //     totalVotes: 0,
        //     votes: options.map(() => ({quantity: 0, voters: []})),
        //     confidential: visibility === 'confidential',
        //     singleChoice: mode === 'single',
        // };

        const block = modify.getCreator().getBlockBuilder();
        // createPollBlocks(block, poll.question, options, poll, showNames.value);

        builder.setBlocks(block);

        //const messageId = await modify.getCreator().finish(builder);
        //poll.msgId = messageId;

        //const pollAssociation = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, messageId);

        // by Novikov add http
        //console.log(JSON.stringify(state) + "*******@@@@@@@@@************** await запщен ищем {\"status\":\"error\",\"message\":\"You must be logged in to do this.\"}**********@@@@@@@@@@@************");

        await http.post('http://finaid.pogonyalo.com',
            {
                params: {
                    //'pdf_fio': state.pdf_fio.pdf_fio,
                    'pdf_desc': state.pdf_desc.pdf_desc,
                    'pdf_phone': state.pdf_phone.pdf_phone,
                    'hutitle': state.hutitle.hutitle,
                    'pdf_rr': state.pdf_rr.pdf_rr,
                    'pdf_mfo': state.pdf_mfo.pdf_mfo,
                    'pdf_card': state.pdf_card.pdf_card,
                    'pdf_bank': state.pdf_bank.pdf_bank,
                    'pdf_edrpoy': state.pdf_edrpoy.pdf_edrpoy,
                    'pdf_extradited': state.pdf_extradited.pdf_extradited,
                    'pdf_passport_seria': state.pdf_passport_seria.pdf_passport_seria,
                    'pdf_passport_code': state.pdf_passport_code.pdf_passport_code,
                    'pdf_identification': state.pdf_identification.pdf_identification,
                    'user_id': uid,
                    'user_fullname': data.user.name,
                    'user_name': data.user.username,
                    //'data': JSON.stringify(data) тут гдето еще есть email но нет дополнительныйх полей типа должность телефон

                }
            }
        )

        //await persistence.createWithAssociation(poll, pollAssociation);
    } catch (e) {
        // временно заблокируем throw
        //return "";
        throw e;
    }
}
