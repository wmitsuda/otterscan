import React from "react";
import { BigNumber, FixedNumber } from "@ethersproject/bignumber";
import { commify } from "@ethersproject/units";

type USDAmountProps = {
  amount: BigNumber;
  amountDecimals: number;
  quote: BigNumber;
  quoteDecimals: number;
};

// TODO: fix the duplication mess with other currency display components

/**
 * Basic display of USD amount WITHOUT box decoration, only
 * text formatting.
 *
 * USD amounts are displayed commified with 2 decimals places and $ prefix,
 * i.e., "$1,000.00".
 */
const USDAmount: React.FC<USDAmountProps> = ({
  amount,
  amountDecimals,
  quote,
  quoteDecimals,
}) => {
  const value = amount.mul(quote);
  const decimals = amountDecimals + quoteDecimals;

  return (
    <span className="text-xs">
      $
      <span className="font-balance">
        {commify(
          FixedNumber.fromValue(value, decimals, `ufixed256x${decimals}`)
            .round(2)
            .toString()
        )}
      </span>
    </span>
  );
};

export default React.memo(USDAmount);
