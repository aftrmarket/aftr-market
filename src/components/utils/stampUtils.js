import Stamps from '@permaweb/stampjs'
import { WarpFactory } from 'warp-contracts'

export default {
    install: (app, options = { warp: WarpFactory.forMainnet() }) => {
        app.config.globalProperties.$stampUtils = {
            stamps: Stamps.init({ warp: options.warp }),
            async stamp(tx, qty = 0, tags = []) {
                return await this.stamps.stamp(tx, qty, tags)
            },
            async count(tx) {
                return await this.stamps.count(tx)
            },
            async counts(txs) {
                return await this.stamps.counts(txs)
            },
            async balance(address) {
                return await this.stamps.balance(address)
            }
        }
    }
};

