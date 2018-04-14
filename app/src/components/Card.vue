<template>
    <li class="card" v-bind:class="{'no-style' : preview, 'pdf-style' : pdf}" v-bind:id="'card-' + card.id">
        <div class="card__members">
            <span v-for="id in card.idMembers">{{ getInitial(id) }}</span>
        </div>
        <div class="card__points">
            <span>
                {{ getPoints(card.name) }}
            </span>
        </div>
        <div class="card__name">
            {{ getName(card.name) }}
        </div>
        <div class="card__labels">
            <span v-for="l in card.labels" v-bind:style="{background : preview ? 'transparent' : l.color}">
                {{ l.name }}
            </span>
        </div>
        <div class="card__id">
            <span>
                #{{ card.idShort }}
            </span>
        </div>
        <div class="card__select">
            <el-checkbox v-on:change="selectCard($event, card)" v-bind:value="isSelected(card.id)"></el-checkbox>
        </div>
    </li>
</template>

<script>
	import TrelloStore from "@/stores/TrelloStore.js";
	import PdfStore from "@/stores/PdfStore.js";

	const rex = /\([^)]*\)|\[[^\]]*\]/g;

	export default {
		store: TrelloStore,
		props: {
			card: {
				default: {},
				type: Object
			},
			preview: {
				default: false,
				type: Boolean
			},
			pdf: {
				default: false,
				type: Boolean
			}
		},
		computed: {
			members() {
				return this.$store.state.members;
			},
			labels() {
				return this.$store.state.labels;
			}
		},
		methods: {
			isSelected(cardId) {
				return PdfStore.state.selectedCard.includes(cardId);
			},
			selectCard(val, card) {
				PdfStore.dispatch("selectCard", card.id);
			},
			getPoints(name) {
				let points = rex.exec(name);

				if (points != null && points.length > 0) {
					return points[0].replace("(", "").replace(")", "");
				}

				return "";
			},
			getName(name) {
				return name.replace(rex, "");
			},
			getInitial(memberId) {
				membersLoop: for (let m of this.members) {
					if (m.id === memberId) {
						if (m.fullName.indexOf(" ") > 0) {
							let initials = m.fullName.match(/\b\w/g) || [];
							initials = (
								(initials.shift() || "") + (initials.pop() || "")
							).toUpperCase();

							return initials;
						} else {
							return m.fullName[0].toUpperCase();
						}
						break membersLoop;
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
    @mixin span() {
        width: 30px;
        height: 30px;
        overflow: hidden;
        line-height: 30px;
        background: #12a;
        text-align: center;
        padding: 0;
        border-radius: 100px;
        color: white;
        font-size: 12px;
        margin-right: 7px;
        display: inline-block;
    }

    .card {
        width: 290px;
        height: 290px;
        text-align: center;
        padding: 10px;
        /*display: inline-block;*/
        float: left;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 10px 2px rgba(0, 0, 0, 0.3);
        background: #f0e9a0;
        transform: rotate(3.5deg) scale(0.9);
        margin-right: 15px;
        transition: all 0.3s ease-in-out;
        overflow: hidden;

        &__select {
            position: absolute;
            bottom: 10px;
            right: 10px;
            height: 30px;
            line-height: 30px;

            span {
                @include span();
            }
        }

        &__name {
            display: inline-block;
            font-size: 18px;
        }
        &__members {
            position: absolute;
            top: 10px;
            left: 10px;
            height: 30px;
            line-height: 30px;

            span {
                @include span();
            }
        }

        &__id {
            position: absolute;
            bottom: 10px;
            left: 10px;
            height: 30px;
            line-height: 30px;

            span {
                @include span();
                border-radius: 0;
                width: 70px;
                font-weight: 600;
            }
        }

        &__points {
            position: absolute;
            top: 10px;
            right: 10px;
            height: 30px;
            line-height: 30px;

            span {
                @include span();

                background: #409eff;
            }
        }

        &__labels {
            position: absolute;
            bottom: 10px;
            right: 30px;
            height: 30px;
            line-height: 30px;

            span {
                @include span();

                width: auto;
                max-width: 100px;
                text-overflow: ellipsis;
                background: #409eff;
                white-space: nowrap;
                padding-left: 7px;
                padding-right: 7px;
                border-radius: 0;
            }
        }

        &.no-style,
        &.pdf-style {
            transform: none;
            box-shadow: none;
            background: white;
            border: 1px dashed black;
            margin: 0;

            .card__select {
                display: none;
            }

            .card__members {
                span {
                    background-color: transparent;
                    color: black;
                    margin-right: 0;
                }
            }

            .card__id {
                span {
                    background-color: transparent;
                    color: black;
                    margin-right: 0;
                    font-size: 20px;
                }
            }

            .card__points {
                span {
                    color: black;
                    font-weight: 600;
                    font-size: 16px;
                    background-color: transparent;
                }
            }

            .card__labels {
                span {
                    background-color: transparent !important;
                    color: black;
                    font-weight: 600;
                    font-size: 12px;
                }
            }
        }
    }
</style>
