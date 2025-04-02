import mongoose from 'mongoose';

const TreeSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^0x[0-9a-fA-F]{40}$/.test(v),
      message: (props) => `${props.value} is not a valid Ethereum address!`,
    },
  },
  treeId: {
    type: String,
    required: true,
    unique: true,
  },
  species: {
    type: String,
    required: true,
  },
  growthStage: {
    type: Number,
    default: 0,
  },
  row: {
    type: Number,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  },
  assignedTask: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

function createDefaultGrid() {
  return Array.from({ length: 5 }, () => Array(5).fill(null));
}

const GardenSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^0x[0-9a-fA-F]{40}$/.test(v),
      message: (props) => `${props.value} is not a valid Ethereum address!`,
    },
  },

  grid: {
    type: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'Tree' }]],
    default: createDefaultGrid,
  },
}, {
  timestamps: true,
});


const Tree = mongoose.models.Tree || mongoose.model('Tree', TreeSchema);
const Garden = mongoose.models.Garden || mongoose.model('Garden', GardenSchema);

export { Tree, Garden };
