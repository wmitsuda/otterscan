import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import NavButton from "./NavButton";
import { ChecksummedAddress } from "../types";
import { RuntimeContext } from "../useRuntime";
import {
  prefetchTransactionBySenderAndNonce,
  useTransactionCount,
} from "../useErigonHooks";
import { useSWRConfig } from "swr";

type NavNonceProps = {
  sender: ChecksummedAddress;
  nonce: number;
};

const NavNonce: React.FC<NavNonceProps> = ({ sender, nonce }) => {
  const { provider } = useContext(RuntimeContext);
  const count = useTransactionCount(provider, sender);

  // Prefetch
  const swrConfig = useSWRConfig();
  useEffect(() => {
    if (!provider || !sender || nonce === undefined || count === undefined) {
      return;
    }

    prefetchTransactionBySenderAndNonce(swrConfig, provider, sender, nonce - 1);
    prefetchTransactionBySenderAndNonce(swrConfig, provider, sender, nonce + 1);
    if (count > 0) {
      prefetchTransactionBySenderAndNonce(
        swrConfig,
        provider,
        sender,
        count - 1
      );
    }
  }, [swrConfig, provider, sender, nonce, count]);

  return (
    <div className="pl-2 self-center flex space-x-1">
      <NavButton sender={sender} nonce={nonce - 1} disabled={nonce === 0}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </NavButton>
      <NavButton
        sender={sender}
        nonce={nonce + 1}
        disabled={count === undefined || nonce >= count - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </NavButton>
      <NavButton
        sender={sender}
        nonce={count !== undefined ? count - 1 : -1}
        disabled={count === undefined || nonce >= count - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <FontAwesomeIcon icon={faChevronRight} />
      </NavButton>
    </div>
  );
};

export default React.memo(NavNonce);
