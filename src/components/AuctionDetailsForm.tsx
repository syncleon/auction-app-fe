import React, {useState} from 'react';
import {Auction} from "../models/IAuction";
import {useHistory} from "react-router-dom";

const AuctionsForm: React.FC = () => {
    const [auctions, setAuctions] = useState<Auction[]>([])
    const history = useHistory();



    return (
        <div>
            DIALOG
        </div>
    );
};

export default AuctionsForm;