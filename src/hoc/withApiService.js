import React from 'react';
import { ApiServiceConsumer } from '../context';

const withApiService = Wrapped => props =>
    <ApiServiceConsumer>{apiService => <Wrapped {...props} API={apiService} />}</ApiServiceConsumer>;

export default withApiService;
