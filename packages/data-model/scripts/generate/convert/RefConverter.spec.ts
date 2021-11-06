import RefConverter from './RefConverter';

describe('Refs transformation', () => {
    test.each([
        ['iroha_crypto::Hash', 'Hash'],
        ['iroha_data_model::Vec<u8>', 'BytesVec'],
        ['pipeline::Event<pipeline::Map<A, B>, C>', 'EventMapABC'],
        ['Vec<u8>', 'BytesVec'],
        ['[u32; 5]', 'ArrayU32L5'],
        ['String', 'Str'],
        ['Vec<u32>', 'VecU32'],
        ['BTreeMap<iroha_data_model::account::Id, iroha_data_model::account::AssetId>', 'BTreeMapAccountIdAssetId'],
        [
            'BTreeMap<String, iroha_data_model::expression::EvaluatesTo<iroha_data_model::Value>>',
            'BTreeMapStringEvaluatesToValue',
        ],
        ['Fixed<i64>', 'FixedI64'],
        ['iroha_data_model::query::Payload', 'QueryPayload'],
        ['iroha_data_model::transaction::Payload', 'TransactionPayload'],
        ['iroha_data_model::events::EventFilter', 'EventFilter'],
        ['iroha_data_model::events::data::EventFilter', 'DataEventFilter'],
        ['iroha_data_model::events::pipeline::EventFilter', 'PipelineEventFilter'],
        ['iroha_data_model::account::Id', 'AccountId'],
        ['iroha_data_model::expression::EvaluatesTo<iroha_data_model::account::Id>', 'EvaluatesToAccountId'],
    ])('%p transformed into %p', (input, output) => {
        const sut = new RefConverter();

        expect(sut.handle(input)).toEqual(output);
    });
});

test('Extracts additional BTreeSet', () => {
    // Arrange
    const sut = new RefConverter();

    // Act
    sut.handle('BTreeSet<model::type>');

    // Assert
    expect(sut.collectedTypes).toEqual({
        BTreeSetType: {
            t: 'set',
            entry: 'Type',
        },
    });
});
